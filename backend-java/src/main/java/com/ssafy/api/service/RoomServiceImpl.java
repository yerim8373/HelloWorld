package com.ssafy.api.service;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.db.entity.Room;
import com.ssafy.db.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("roomService")
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Override
    public void makeRoom(String roomId, final RoomDto roomDto) {
        Room room = Room.builder()
                .roomId(roomDto.getRoomId())
                .language(roomDto.getLanguage())
                .build();
        roomRepository.save(room);
    }

    @Override
    public RoomDto findRoom(final RoomDto roomDto) {
        Room room = roomRepository.findByRoomId(roomDto.getRoomId());

        if (room == null) {
            throw new RuntimeException();
        }

        return RoomDto.of(roomRepository.findByRoomId(roomDto.getRoomId()));
    }

    @Override
    public RoomDto getRoomDto(String roomId) {
        return RoomDto.of(roomRepository.findByRoomId(roomId));
    }

    @Override
    public List<RoomDto> quickRoom(RoomDto roomDto) {
        List<RoomDto> list = new ArrayList<>();
        for(Room room : roomRepository.findAll()){
            list.add(RoomDto.of(room));
        }
        return list;
    }
}
