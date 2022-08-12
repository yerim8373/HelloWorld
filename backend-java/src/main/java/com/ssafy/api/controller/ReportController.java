package com.ssafy.api.controller;

import com.ssafy.api.dto.ReviewDto;
import com.ssafy.api.service.ReportService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/report")
public class ReportController {

    private final ReportService reportService;
    private final Response response;

    @GetMapping("")
    public ResponseEntity<?> getAllReports(){
        return response.success(reportService.getAllReports(), "getAllReports success", HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getReportsByEmail(@PathVariable String email){
        return response.success(reportService.getReportsByEmail(email),"getReportsByEmail success",HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> insertReport(@RequestBody String email) {
        reportService.insertReport(email);
        return response.success(HttpStatus.OK);
    }
}
