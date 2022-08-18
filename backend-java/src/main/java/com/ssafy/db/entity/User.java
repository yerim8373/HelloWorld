package com.ssafy.db.entity;

import com.ssafy.api.dto.*;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
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
@ToString
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

    @Column(length = 500)
    private String description;

    private Integer age;
    private String avatarSrc;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @ManyToMany(fetch = FetchType.EAGER)
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
    private LocalDateTime blackExpireDate;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="countryId")
    private Country country;


    @OneToMany(mappedBy = "user")
    private List<Report> reportList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Review> reviewList = new ArrayList<>();
    @OneToMany(mappedBy = "toUser")
    private List<HeartHistory> heartHistoryList = new ArrayList<>();
    @OneToMany(mappedBy = "fromUser")
    private List<HeartHistory> heartHistories = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Notification> notificationList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<Runtime> runtimeList = new ArrayList<>();
    @OneToMany(mappedBy = "user" , cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<UserLan> userLanList = new ArrayList<>();

    public void setCountry(Country country){
        this.country = country;
    }

    public void setAvatarSrc(String src){
        this.avatarSrc = src;
    }

    public void removeUserLan(UserLan userLan){
        this.userLanList.remove(userLan);
        userLan.deleteUser();
    }

    public void changeUserInfo(UserDto userDto){
        this.mobileNumber = userDto.getMobileNumber();
        this.nickname = userDto.getNickname();
        this.description = userDto.getDescription();
        this.age = userDto.getAge();
        this.avatarSrc = userDto.getAvatarSrc();
        this.gender = userDto.getGender();
    }

    public void setPw(String pw){
        this.pw = pw;
    }
}
