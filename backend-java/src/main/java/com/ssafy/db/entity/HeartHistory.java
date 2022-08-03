package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 2022-07-19
 * 하트 이력을 나타내는 테이블
 * made by 홍주성
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class HeartHistory extends BaseEntity{
    private int cnt;
    @Enumerated(EnumType.STRING)
    private Route route;
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fromUserId")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "toUserId")
    private User toUser;

    public void setUser(User toUser){
        this.toUser = toUser;
        toUser.getHeartHistoryList().add(this);
    }
}
