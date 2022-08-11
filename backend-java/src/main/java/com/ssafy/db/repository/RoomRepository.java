package com.ssafy.db.repository;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, String> {
//    @Query("select r from Room r join fetch r.userJoin join fetch r.userMake where r.roomId = :roomId ")
    @Query("select r from Room r where r.roomId = :roomId ")
    //이게 왜 돼? 유저까지 들어가는데?
    Room findByRoomId(String roomId);
//    @Query("select u from User u where u.id in (select r. from Room r) ")
//    List<User> findUserByRoomId(String rooId);
}
