package com.ssafy.api.controller;

import com.ssafy.api.dto.ChatRoomDTO;
import com.ssafy.db.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
@Log4j2
public class RoomController {

    private final ChatRoomRepository repository;

    //채팅방 목록 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomDTO>> rooms(){

        log.info("# All Chat Rooms");

        List<ChatRoomDTO> list = repository.findAllRooms();
        return ResponseEntity.ok(list);
    }

    //채팅방 개설
    @PostMapping("/room")
    public ResponseEntity<ChatRoomDTO> create(@RequestParam String name){

        log.info("# Create Chat Room , name: " + name);
        return ResponseEntity.ok(ChatRoomDTO.of(200, "Success", repository.createChatRoomDTO(name)));
    }

    //채팅방 조회
    @GetMapping("/room")
    public ResponseEntity<ChatRoomDTO> getRoom(String roomId, Model model){

        log.info("# get Chat Room, roomID : " + roomId);
        return ResponseEntity.ok(ChatRoomDTO.of(200, "Success", repository.findRoomById(roomId)));
    }
}