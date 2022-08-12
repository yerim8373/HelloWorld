package com.ssafy.api.dto;

import com.ssafy.db.entity.Runtime;
import com.ssafy.db.entity.User;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RuntimeDto {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private UserDto user;

    public static RuntimeDto of(Runtime runtime){
        return RuntimeDto.builder()
                .user(UserDto.of(runtime.getUser()))
                .startDate(runtime.getStartDate())
                .endDate(runtime.getEndDate())
                .build();
    }
}
