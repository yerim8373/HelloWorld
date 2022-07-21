package com.ssafy.api.dto;

import com.ssafy.db.entity.Gender;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SignUpDto {
    private String email;
    private String pw;
    private int age;
    private Gender gender;
    private String avatar;
    private String mobileNumber;
    private String name;
    private String nickName;
    private Long country;
    private List<Long> languageList;
}
