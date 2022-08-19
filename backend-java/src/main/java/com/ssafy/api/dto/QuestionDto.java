package com.ssafy.api.dto;

import com.ssafy.db.entity.QQuestion;
import com.ssafy.db.entity.Question;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {
    private Long questionId;
    private LanguageDto language;
    private String content;

    public static QuestionDto of(Question question){
        return new QuestionDtoBuilder()
                .content(question.getContent())
                .questionId(question.getId())
                .language(LanguageDto.of(question.getLanguage()))
                .build();
    }
}

