package com.ssafy.db.repository;

import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.Tip;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TipRepository extends JpaRepository<Tip, Long> {
    @Query("select t from Tip t where t.language.id" +
            " = (select ul.language.id from UserLan ul where ul.user.id = :userId and ul.priority = 1)")
    List<Tip> findAllByUserId(@Param("userId") Long userId);
}
