package com.ssafy.api.service;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.db.entity.Room;

import java.util.List;

public interface RoomService {

    void makeRoom(String roomId, String email);
    void joinRoom(String roomId, String email);
    List<RoomDto> findRoom();
    RoomDto getRoomDto(String roomId);
}
