package com.ssafy.db.repository;

import com.ssafy.db.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query("select r from Report r where r.user.email = :email")
    List<Report> findReportByEmail(@Param("email") String email);

    @Query("select count(r) from Report r where r.user.email = :email and (r.regDate between :start and :end)")
    Long countReportsByEmail(@Param("email") String email,@Param("start") LocalDateTime start,@Param("end") LocalDateTime end);
}
