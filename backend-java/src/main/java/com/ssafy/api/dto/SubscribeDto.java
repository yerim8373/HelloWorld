package com.ssafy.api.dto;

import com.google.common.eventbus.Subscribe;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SubscribeDto {
    private Long subscribeId;
}
