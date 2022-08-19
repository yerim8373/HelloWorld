package com.ssafy.db.repository;

import com.ssafy.db.entity.HeartHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HeartHistoryRepository extends JpaRepository<HeartHistory, Long> {
}

