package com.ssafy.api.dto;

import com.ssafy.db.entity.Subscribe;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubscribeDto {
    int no;
    public static SubscribeDto of(Subscribe subscribe){
        return new SubscribeDto();
    }
}