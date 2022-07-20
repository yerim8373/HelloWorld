package com.ssafy.webrtc;


import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;
import org.kurento.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class UserSession{
    private static final Logger logger = LoggerFactory.getLogger(UserSession.class);
    private final String name;
    private final WebSocketSession session;
    private String sdpOffer;
    private String callingTo;
    private String callingFrom;
    private WebRtcEndpoint webRtcEndpoint;
    private final List<IceCandidate> candidateList = new ArrayList<>();

    public UserSession(String name, WebSocketSession session) {
        this.name = name;
        this.session = session;
    }
    public void sendMessage(JsonObject message) throws IOException {
        logger.debug("Sending message from user '{}': {}", name, message);
        session.sendMessage(new TextMessage(message.toString()));
    }
    public void setWebRtcEndpoint(WebRtcEndpoint webRtcEndpoint) {
        this.webRtcEndpoint = webRtcEndpoint;

        for (IceCandidate e : candidateList) {
            this.webRtcEndpoint.addIceCandidate(e);
        }
        this.candidateList.clear();
    }

    public void addCandidate(IceCandidate candidate) {
        if (this.webRtcEndpoint != null) {
            this.webRtcEndpoint.addIceCandidate(candidate);
        } else {
            candidateList.add(candidate);
        }
    }

    public void clear() {
        this.webRtcEndpoint = null;
        this.candidateList.clear();
    }
}
