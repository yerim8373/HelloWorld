package com.ssafy.db.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity @Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Credit extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscribeId")
    private Subscribe subscribe;

    public void setInfo(User user, Subscribe subscribe){
        setUser(user);
        setSubscribe(subscribe);

        user.addPeriod(subscribe.getPeriod());
    }
    public void setUser(User user){
        this.user = user;
        user.getCreditList().add(this);
    }
    public void setSubscribe(Subscribe subscribe){
        this.subscribe = subscribe;
        subscribe.getCreditList().add(this);
    }
}
