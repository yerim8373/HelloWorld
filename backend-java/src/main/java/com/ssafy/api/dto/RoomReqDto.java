package com.ssafy.api.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomReqDto {
    @ApiModelProperty(name = "방 번호", example="QB8TKZC05P")
    private String roomId;
}
