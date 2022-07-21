package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * 20022-07-19
 * 유저 테이블
 * made by 홍주성
 */
@Entity
@Builder @Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity{

    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String pw;
    @Column(nullable = true)
    private String name;
    @Column(unique = true, nullable = false)
    private String mobileNumber;
    @Column(unique = true, nullable = false)
    private String nickname;

    private Integer age;
    private String avatarSrc;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private Boolean blackListNY;
    private LocalDate blackExpireDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="countryId")
    private Country country;

    @OneToMany(mappedBy = "user")
    private List<Report> reportList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Review> reviewList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<HeartHistory> heartHistoryList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Notification> notificationList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Runtime> runtimeList = new ArrayList<>();
    @OneToMany(mappedBy = "user" )
    private List<UserLan> userLanList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Subscribe> subscribeList = new ArrayList<>();
}
