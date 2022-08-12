package com.ssafy.api.dto;

import com.ssafy.db.entity.Report;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {
    private Long reportId;
    private String regDate;
    private UserDto user;

    public static ReportDto of(Report report) {
        return new ReportDtoBuilder()
                .reportId(report.getId())
                .regDate(report.getRegDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .user(UserDto.of(report.getUser()))
                .build();
    }
}
