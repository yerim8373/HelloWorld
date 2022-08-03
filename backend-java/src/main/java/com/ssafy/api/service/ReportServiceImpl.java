package com.ssafy.api.service;

import com.ssafy.api.dto.ReportDto;
import com.ssafy.db.entity.Report;
import com.ssafy.db.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.util.List;

@Service("reportService")
@RequiredArgsConstructor
@Transactional
public class ReportServiceImpl implements ReportService{

//    private final ReportRepository reportRepository;
//
//    public void insertReport(MultipartFile file){
//
//
//    }
//
//    public List<ReportDto> getAllReport(){
//
//    }
//
//    public List<ReportDto> getReporyById(Long id){
//
//    }





}
