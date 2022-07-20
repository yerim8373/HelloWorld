package com.ssafy.webrtc;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.IceCandidateFoundEvent;
import org.kurento.client.KurentoClient;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component("callHandler")
@RequiredArgsConstructor
public class CallHandler extends TextWebSocketHandler {
    private static Logger logger = LoggerFactory.getLogger(CallHandler.class);
    private static final Gson gson = new GsonBuilder().create();
    private static final String REGISTER = "register";
    private static final String CALL = "call";
    private static final String INCOMING_CALL_RESPONSE = "incomingCallResponse";
    private static final String ON_ICE_CANDIDATE = "onIceCandidate";
    private static final String STOP = "stop";



    private final ConcurrentHashMap<String, CallMediaPipeline> pipelines = new ConcurrentHashMap<>();
    private final KurentoClient kurento;
    private final UserRegistry registry;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonObject jsonMsg = gson.fromJson(message.getPayload(), JsonObject.class);
        UserSession user = registry.getBySession(session);

        if(user != null){
            logger.debug("Incoming message from user {} : {}", user.getName(), jsonMsg);
        }
        else{
            logger.debug("Incoming message from new user {}", jsonMsg);
        }

        switch(jsonMsg.get("id").getAsString()){
            case REGISTER:
                try{
                    register(session, jsonMsg);
                }catch (Throwable t){
                    handleErrorResponse(t, session, "registerResponse");
                }
                break;
            case CALL:
                try{
                    call(user, jsonMsg);
                }catch (Throwable t){
                    handleErrorResponse(t, session, "callResponse");
                }
                break;
            case INCOMING_CALL_RESPONSE:
                incomingCallResponse(user, jsonMsg);
                break;
            case ON_ICE_CANDIDATE:
                JsonObject candidate = jsonMsg.get("candidate").getAsJsonObject();
                if(user != null){
                    IceCandidate iceCandidate = new IceCandidate(candidate.get("candidate").getAsString(), candidate.get("sdpMid").getAsString(), candidate.get("sdpMLineIndex").getAsInt());
                    user.addCandidate(iceCandidate);
                }
                break;
            case STOP:
                stop(session);
                break;
            default:
                break;
        }
    }

    private void incomingCallResponse(UserSession callee, JsonObject jsonMsg) throws IOException{
        String callResponse = jsonMsg.get("callResponse").getAsString();
        String from = jsonMsg.get("from").getAsString();

        UserSession caller = registry.getByName(from);
        String to = caller.getCallingTo();

        if("accept".equalsIgnoreCase(callResponse)){
            logger.debug("Accepted call from {} to {}", from, to);

            CallMediaPipeline pipeline = null;

            try{
                pipeline = new CallMediaPipeline(kurento);
                pipelines.put(caller.getSession().getId(), pipeline);
                pipelines.put(callee.getSession().getId(), pipeline);

                callee.setWebRtcEndpoint(pipeline.getCalleeWebRtcEp());
                pipeline.getCalleeWebRtcEp().addIceCandidateFoundListener(
                        new EventListener<IceCandidateFoundEvent>() {
                            @Override
                            public void onEvent(IceCandidateFoundEvent event) {
                                JsonObject response = new JsonObject();
                                response.addProperty("id", "iceCandidate");
                                response.add("candidate", JsonUtils.toJsonElement(event.getCandidate()));
                                try{
                                    synchronized (callee.getSession()){
                                        callee.getSession().sendMessage(new TextMessage(response.toString()));
                                    }
                                }catch (IOException e){
                                    logger.debug(e.getMessage());
                                }
                            }
                        }
                );
                caller.setWebRtcEndpoint(pipeline.getCallerWebRtcEp());
                pipeline.getCallerWebRtcEp().addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
                    @Override
                    public void onEvent(IceCandidateFoundEvent event) {
                        JsonObject response = new JsonObject();
                        response.addProperty("id", "iceCandidate");
                        response.add("candidate", JsonUtils.toJsonElement(event.getCandidate()));
                        try{
                            synchronized (callee.getSession()){
                                callee.getSession().sendMessage(new TextMessage(response.toString()));
                            }
                        }catch (IOException e){
                            logger.debug(e.getMessage());
                        }
                    }
                });
                String calleeSdpOffer = jsonMsg.get("sdpOffer").getAsString();
                String calleeSdpAnswer = pipeline.generateSdpAnswerForCallee(calleeSdpOffer);
                JsonObject startCommunication = new JsonObject();
                startCommunication.addProperty("id", "startCommunication");
                startCommunication.addProperty("sdpAnswer", calleeSdpAnswer);

                synchronized (callee){
                    callee.sendMessage(startCommunication);
                }

                pipeline.getCalleeWebRtcEp().gatherCandidates();

                String callerSdpOffer = registry.getByName(from).getSdpOffer();
                String callerSdpAnswer = pipeline.generateSdpAnswerForCaller(callerSdpOffer);
                JsonObject response = new JsonObject();
                response.addProperty("id", "callResponse");
                response.addProperty("response", "accepted");
                response.addProperty("sdpAnswer", callerSdpAnswer);

                synchronized (caller){
                    caller.sendMessage(response);
                }
            }catch (Throwable t){
                logger.error(t.getMessage(), t);

                if(pipeline != null){
                    pipeline.release();
                }

                pipelines.remove(caller.getSession().getId());
                pipelines.remove(callee.getSession().getId());

                JsonObject response = new JsonObject();

                response.addProperty("id", "callResponse");
                response.addProperty("response", "rejected");
                caller.sendMessage(response);

                response = new JsonObject();
                response.addProperty("id", "stopCommunication");
                callee.sendMessage(response);
            }
        }
        else{
            JsonObject response = new JsonObject();
            response.addProperty("id", "callResponse");
            response.addProperty("response", "rejected");
            caller.sendMessage(response);
        }
    }

    private void call(UserSession caller, JsonObject jsonMsg) throws IOException{
        String to = jsonMsg.get("to").getAsString();
        String from = jsonMsg.get("from").getAsString();
        JsonObject response = new JsonObject();

        if(registry.exists(to)){
            caller.setSdpOffer(jsonMsg.getAsJsonPrimitive("sdpOffer").getAsString());
            caller.setCallingTo(to);

            response.addProperty("id", "incomingCall");
            response.addProperty("from", from);

            UserSession callee = registry.getByName(to);
            callee.sendMessage(response);
            callee.setCallingFrom(from);
        }
        else{
            response.addProperty("id", "callResponse");
            response.addProperty("response", "reject: user '"+to+"' is not registered");

            caller.sendMessage(response);
        }
    }

    private void handleErrorResponse(Throwable throwable, WebSocketSession session, String responseId) throws IOException{
        stop(session);

        logger.error(throwable.getMessage(), throwable);

        JsonObject response = new JsonObject();

        response.addProperty("id", responseId);
        response.addProperty("response", "rejected");
        response.addProperty("message", throwable.getMessage());
        session.sendMessage(new TextMessage(response.toString()));
    }

    private void stop(WebSocketSession session) throws IOException {
        String sessionId = session.getId();

        if(pipelines.contains(sessionId)){
            pipelines.get(sessionId).release();
            CallMediaPipeline pipeline = pipelines.remove(sessionId);
            pipeline.release();;
        }
    }

    private void register(WebSocketSession session, JsonObject jsonMsg) throws IOException {
        String name = jsonMsg.getAsJsonPrimitive("name").getAsString();

        UserSession caller = new UserSession(name, session);

        String responseMsg = "accepted";
        if(name.isEmpty()){
            responseMsg = "rejected : empty user name";
        }
        else if(registry.exists(name)){
            responseMsg = "rejected : user '"+name+"' already registered";
        }
        else{
            registry.register(caller);
        }

        JsonObject response = new JsonObject();
        response.addProperty("id", "registerResponse");
        response.addProperty("response", responseMsg);
        caller.sendMessage(response);
    }
}
