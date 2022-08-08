package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity @Getter @Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Credit extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;
    private LocalDateTime membershipExpireDate;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "subscribeId")
//    private Subscribe subscribe;

//    public void setInfo(User user, LocalDateTime membershipExpireDate){
//        setUser(user);
////        setSubscribe(subscribe);
////        user.addPeriod(subscribe.getPeriod());
//    }
    public void setUser(User user){
        this.user = user;
        user.getCreditList().add(this);
    }

    // 결제 금액따라 추가
    public void addPeriod(long period){
        if(this.membershipExpireDate == null || this.membershipExpireDate.isBefore(LocalDateTime.now())){
            this.membershipExpireDate = LocalDateTime.now().plusMonths(period);
        }
        else{
            this.membershipExpireDate = this.membershipExpireDate.plusMonths(period);
        }
    }
}
