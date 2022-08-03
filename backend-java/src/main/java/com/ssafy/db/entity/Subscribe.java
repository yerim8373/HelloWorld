package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


/**
 * 2022-07-19
 * 서비스 구독 테이블
 * made by 홍주성
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Subscribe extends BaseEntity{
    private int price;
    private long period;

    @OneToMany(mappedBy = "subscribe")
    private List<Credit> creditList = new ArrayList<>();
}
