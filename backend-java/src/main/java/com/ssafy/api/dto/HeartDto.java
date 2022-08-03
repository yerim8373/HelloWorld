package com.ssafy.api.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HeartDto {
    private int cnt;
    private String route;
    private Long fromUser;
    private Long toUser;
    private String name;
}
