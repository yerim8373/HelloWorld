package com.ssafy.api.dto;

import com.ssafy.db.entity.Notification;
import com.ssafy.db.entity.User;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {
    private Boolean checkNY;
    private String content;
    private UserDto user;

    public static NotificationDto of(Notification notification){
        return NotificationDto.builder()
                .user(UserDto.of(notification.getUser()))
                .checkNY(notification.getCheckNY())
                .content(notification.getContent())
                .build();
    }
}
