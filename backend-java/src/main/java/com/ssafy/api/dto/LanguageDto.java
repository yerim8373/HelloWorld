package com.ssafy.api.dto;

import com.ssafy.db.entity.Language;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LanguageDto {
    private Long languageId;
    private String regDate;
    private String lan;

    public static LanguageDto of(Language language){
        return new LanguageDtoBuilder()
                .lan(language.getLan())
                .languageId(language.getId())
                .build();
    }
}
