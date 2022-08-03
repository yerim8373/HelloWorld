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
    LanguageDto language;
    Long userId;

    public static UserLanDto of(UserLan userLan){
        return UserLanDto.builder()
                .userLanId(userLan.getId())
                .fluent(userLan.getFluent())
                .priority(userLan.getPriority())
                .language(LanguageDto.of(userLan.getLanguage()))
                .userId(userLan.getUser().getId())
                .build();
    }
}