package com.ssafy.db.repository;

import com.ssafy.db.entity.UserLan;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserLanRepository extends JpaRepository<UserLan, Long> {
    @Query("select ul from UserLan ul join fetch User u where u.email = :email")
    List<UserLan> findUserLanByEmail(@Param("email")String Email);

}
