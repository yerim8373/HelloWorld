package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends BaseEntity{
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "languageId")
    private Language language;

    public void setUser(Language language){
        this.language = language;
        language.getQuestionList().add(this);
    }
}
