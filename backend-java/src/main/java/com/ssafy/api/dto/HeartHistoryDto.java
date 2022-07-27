package com.ssafy.api.dto;

import com.ssafy.db.entity.HeartHistory;
import com.ssafy.db.entity.Route;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HeartHistoryDto {
    private Long heartHistoryId;
    private int cnt;
    private UserDto from;
    private UserDto to;
    private String route;
    private String name;

    public static HeartHistoryDto of(HeartHistory history){
        HeartHistoryDto hh = new HeartHistoryDto();
        hh.setHeartHistoryId(history.getId());
        hh.setCnt(history.getCnt());
        hh.setFrom(UserDto.of(history.getFromUser()));
        hh.setTo(UserDto.of(history.getToUser()));
        hh.setRoute(history.getRoute().toString());
        hh.setName(history.getName());

        return hh;
    }
}

