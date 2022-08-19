package com.ssafy.api.dto;

import com.ssafy.db.entity.Language;
import lombok.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LanguageDto {
    private Long languageId;
    private String lan;

    public static LanguageDto of(Language language){
        return new LanguageDtoBuilder()
                .lan(language.getLan())
                .languageId(language.getId())
                .build();
    }
}

