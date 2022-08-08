package com.ssafy.api.service;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.db.entity.Room;

public interface RoomService {

    void makeRoom(String roomId, final RoomDto roomDto);
    RoomDto findRoom(final RoomDto roomDto);
    RoomDto getRoomDto(String roomId);
}
