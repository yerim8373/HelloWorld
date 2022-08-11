package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Room{

    @Id
    @Column(name = "room_id", length = 50)
    private String roomId;

    private String language;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_make_id")
    private User userMake;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_join_id")
    private User userJoin;


    public void setUserMake(User user){
        this.userMake = user;
    }
    public void setUserJoin(User user){
        this.userJoin = user;
    }
    public void setLanguage(String language){
        this.language = language;
    }


}
