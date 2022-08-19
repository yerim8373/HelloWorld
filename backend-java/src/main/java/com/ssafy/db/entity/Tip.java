package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

/**
 * 2022-07-19
 * 로딩 중 나타나는 팁 테이블
 * made by 홍주성
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Tip extends BaseEntity{

    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "languageId")
    private Language language;

    public void setLanguage(Language language){
        this.language = language;
    }
}

