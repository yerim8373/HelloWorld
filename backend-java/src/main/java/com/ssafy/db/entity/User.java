package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

/**
 * 유저 모델 정의.
 */
@Entity
@Builder @Getter
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity{
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String pw;
    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String mobile_number;
    @Column(unique = true, nullable = false)
    private String nickname;

    private LocalDate birthday;
    private String imageSrc;

    @Enumerated(EnumType.STRING)
    private GENDER gender;

    @Enumerated(EnumType.STRING)
    private USER_ROLE role;

    private String blackListNY;
    private LocalDate blackExpireDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="countryId")
    private Country country;



}
