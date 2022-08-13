package com.ssafy.db.repository;

import com.ssafy.db.entity.QQuestion;
import com.ssafy.db.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("select q from Question q where q.language.id = (select ul.language.id from UserLan ul where ul.user.id = :userId and ul.priority = 1)")
    List<Question> findAllByUserId(@Param("userId") Long userId);
}
