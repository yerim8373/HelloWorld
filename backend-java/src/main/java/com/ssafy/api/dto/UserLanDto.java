package com.ssafy.api.dto;

import com.ssafy.db.entity.UserLan;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserLanDto {
    Long userLanId;
    int fluent;
    int priority;
    LanguageDto languageDto;
    UserDto userDto;

    public static UserLanDto of(UserLan userLan){
        return UserLanDto.builder()
                .userLanId(userLan.getId())
                .fluent(userLan.getFluent())
                .priority(userLan.getPriority())
                .languageDto(LanguageDto.of(userLan.getLanguage()))
                .userDto(UserDto.of(userLan.getUser()))
                .build();
    }
}