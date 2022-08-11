package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, String> {
    @Query("select r from Room r join fetch User u where r.roomId = :roomId ")
    Room findByRoomId(String roomId);
//    @Query("select u from User u where u.id in (select r. from Room r) ")
//    List<User> findUserByRoomId(String rooId);
}
