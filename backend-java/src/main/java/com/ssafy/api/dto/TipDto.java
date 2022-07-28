package com.ssafy.api.dto;

import com.ssafy.db.entity.Language;
import com.ssafy.db.entity.Tip;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TipDto {
    private Long tipId;
    private String regDate;
    private LanguageDto language;
    private String content;

    public static TipDto of(Tip tip){
        return new TipDtoBuilder()
                .content(tip.getContent())
                .tipId(tip.getId())
                .language(LanguageDto.of(tip.getLanguage()))
                .build();
    }
}