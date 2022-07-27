package com.ssafy.api.dto;

import com.ssafy.db.entity.Language;
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
}