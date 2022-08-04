package com.ssafy.db.repository;

import com.ssafy.db.entity.UserLan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserLanRepository extends JpaRepository<UserLan, Long> {
    @Query("select ul from UserLan ul where ul.user.email = :email")
    List<UserLan> findUserLanByEmail(@Param("email") String Email);

}
