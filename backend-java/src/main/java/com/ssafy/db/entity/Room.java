package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Room{

    @Id
    @Column(name = "room_id", length = 50)
    private String roomId;

    private String Language;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_make")
    private User userMake;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_join")
    private User userJoin;


    public void setUserMake(User user){
        this.userMake = user;
    }
    public void setUserJoin(User user){
        this.userJoin = user;
    }




}
