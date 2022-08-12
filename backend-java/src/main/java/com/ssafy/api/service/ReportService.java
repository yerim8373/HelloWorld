package com.ssafy.api.service;

import com.ssafy.api.dto.ReportDto;

import java.util.List;

public interface ReportService {
    void insertReport(String email);

    List<ReportDto> getAllReports();

    List<ReportDto> getReportsByEmail(String email);
}
