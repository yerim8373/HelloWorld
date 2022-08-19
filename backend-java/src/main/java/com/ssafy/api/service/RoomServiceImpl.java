package com.ssafy.api.service;

import com.ssafy.api.dto.RoomDto;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.db.entity.QRoom.room;


@Service("roomService")
@RequiredArgsConstructor
@Transactional
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;


    @Override
    public void joinRoom(String roomId, String email, String language) {
        Room room = roomRepository.findByRoomId(roomId);
        User user = userRepository.findByEmail(email).get();
        room.setUserJoin(user);
        room.setLanguage(language);
        System.out.println("---------------------------------------------");
        System.out.println(room);
        System.out.println("---------------------------------------------");
    }

    @Override
    public void makeRoom(String roomId, String email) {
        Room room = Room.builder()
                .roomId(roomId)
                .build();
        User user = userRepository.findByEmail(email).get();
        room.setUserMake(user);

        roomRepository.save(room);
    }

    @Override
    public List<RoomDto> findRoom() {
        List<Room> roomList = roomRepository.findAll();

        if (room == null) {
            throw new RuntimeException();
        }

        List<RoomDto> list = new ArrayList<>();
        for (Room room : roomList) {
            list.add(RoomDto.oof(room));
        }
        return list;
    }

    @Override
    public RoomDto getRoomDto(String roomId) {
        return RoomDto.of(roomRepository.findByRoomId(roomId));
    }
}