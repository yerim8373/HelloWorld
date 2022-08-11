package com.ssafy.api.dto;

import com.ssafy.db.entity.Review;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {

    @ApiModelProperty(name = "방 번호", example="QB8TKZC05P")
    private String roomId;
    private String language;
    private User userMake;
    private User userJoin;

    public static RoomDto of(Room room){
        return new RoomDtoBuilder()
                .roomId(room.getRoomId())
                .language(room.getLanguage())
                .userMake(room.getUserMake())
                .userJoin(room.getUserJoin())
                .build();
    }
}
