package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * 20022-07-19
 * 유저 테이블
 * made by 홍주성
 */
@Entity
@Builder @Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime regDate;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String pw;
    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String mobileNumber;
    @Column(unique = true, nullable = false)
    private String nickname;

    private Integer age;
    private String avatarSrc;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToMany
    @JoinTable(
            name = "userAuth",
            joinColumns = {
                    @JoinColumn(name = "userId", referencedColumnName = "id")
            },
            inverseJoinColumns = {
                    @JoinColumn(name = "authName", referencedColumnName = "authName")
            }
    )
    private Set<Authority> authorities;
    private boolean activated;

    private Boolean blackListNY;
    private LocalDate blackExpireDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="countryId")
    private Country country;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="subscribeId")
    private Subscribe subscribe;

    @OneToMany(mappedBy = "user")
    private List<Report> reportList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Review> reviewList = new ArrayList<>();
    @OneToMany(mappedBy = "toUser")
    private List<HeartHistory> heartHistoryList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Notification> notificationList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Runtime> runtimeList = new ArrayList<>();
    @OneToMany(mappedBy = "user" )
    private List<UserLan> userLanList = new ArrayList<>();


    public void setCountry(Country country){
        this.country = country;
    }
    public void setSubscribe(Subscribe subscribe){
        this.subscribe = subscribe;
        subscribe.getUser().add(this);
    }
}
