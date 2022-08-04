package com.ssafy.db.repository;

import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.Tip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TipRepository extends JpaRepository<Tip, Long> {

    @Query("select t from Tip t where t.language.lan = :lan")
    List<Tip> findTipByLan(@Param("lan")String lan);

}
