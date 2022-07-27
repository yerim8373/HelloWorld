package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLan extends BaseEntity {

    private int fluent;
    private int priority;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "languageId")
    private Language language;

    public void setUser(User user){
        this.user = user;
        user.getUserLanList().add(this);
    }

    public void setLanguage(Language language){
        this.language = language;
    }
}
