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
    private String route;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    public void setUser(User user){
        this.user = user;
        user.getHeartHistoryList().add(this);
    }
}
