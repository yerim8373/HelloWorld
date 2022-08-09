package com.ssafy.api.service;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.db.entity.Room;

import java.util.List;

public interface RoomService {

    void makeRoom(String roomId, final RoomDto roomDto);
    RoomDto findRoom(final RoomDto roomDto);
    RoomDto getRoomDto(String roomId);
    List<RoomDto> quickRoom(final RoomDto roomDto);
}
