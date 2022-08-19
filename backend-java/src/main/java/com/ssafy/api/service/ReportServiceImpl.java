package com.ssafy.api.service;

import com.ssafy.api.dto.ReportDto;
import com.ssafy.common.util.RedisUtil;
import com.ssafy.db.entity.Report;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ReportRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("reportService")
@RequiredArgsConstructor
@Transactional
public class ReportServiceImpl implements ReportService{

    private static final String BLACK = "BLACK::";

    private final RedisUtil redisUtil;
    private final ReportRepository reportRepository;
    private final UserService userService;
    private static final Long month = 1000L*60*60*24*30;

    @Override
    public void insertReport(String email) {
        // 신고넣고, 한달간 3번인지 확인
        // 3번이면 blacklist 넣기
        // 아님 말고
        Report report = reportRepository.save(Report.builder().build());
        report.setUser(userService.getUserByEmail(email));
        report.setRegDate(LocalDateTime.now());

        LocalDateTime end = LocalDateTime.now();
        LocalDateTime start = end.minusDays(30);

        Long cnt = reportRepository.countReportsByEmail(email, start, end);
        if(cnt >= 3){
            User user = userService.getUserByEmail(email);
            String key = BLACK + user.getId();

            redisUtil.set(key, 1, month);
        }
    }

    @Override
    public List<ReportDto> getAllReports() {
        List<ReportDto> list = new ArrayList<>();
        for(Report report : reportRepository.findAll()){
            list.add(ReportDto.of(report));
        }
        return list;
    }

    @Override
    public List<ReportDto> getReportsByEmail(String email) {
        List<ReportDto> list = new ArrayList<>();
        for(Report report : reportRepository.findReportByEmail(email)){
            list.add(ReportDto.of(report));
        }
        return list;
    }
}

