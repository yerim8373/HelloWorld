package com.ssafy.api.dto;

import com.ssafy.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class ChatRoomDTO extends BaseResponseBody {

    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();
    //WebSocketSession은 Spring에서 Websocket Connection이 맺어진 세션

    public static ChatRoomDTO create(String name){
        ChatRoomDTO room = new ChatRoomDTO();

        room.roomId = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }

    public static ChatRoomDTO of(Integer statusCode, String message, ChatRoomDTO chatRoomDTO){
        chatRoomDTO.setStatusCode(statusCode);
        chatRoomDTO.setMessage(message);
        return chatRoomDTO;
    }
}