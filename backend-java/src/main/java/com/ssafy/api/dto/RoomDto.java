package com.ssafy.api.dto;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RoomDto {

    @ApiModelProperty(name = "방 번호", example="QB8TKZC05P")
    private String roomId;
    private String language;
    private UserDto userMake;
    private UserDto userJoin;

    public static RoomDto of(Room room){
        System.out.println(room);
        return new RoomDtoBuilder()
                .roomId(room.getRoomId())
                .language(room.getLanguage())
                .userMake(UserDto.of(room.getUserMake()))
                .userJoin(UserDto.of(room.getUserJoin()))
                .build();
    }

    public static RoomDto oof(Room room){
        return new RoomDtoBuilder()
                .roomId(room.getRoomId())
                .userMake(UserDto.of(room.getUserMake()))
                .build();
    }
}
