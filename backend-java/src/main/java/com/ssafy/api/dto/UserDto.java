package com.ssafy.api.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.*;
import com.ssafy.db.entity.Runtime;
import lombok.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
     private Long id;
     private String email;
     private String name;
     private String mobileNumber;
     private String nickname;
     private Integer age;
     private Gender gender;

     private Boolean blackListNY;
     private String blackExpireDate;

     private CountryDto country;
     private SubscribeDto subscribe;

    public static UserDto of(User user){
        UserDto userDto = new UserDto();
        userDto.id = user.getId();
        userDto.email = user.getEmail();
        userDto.name = user.getName();
        userDto.mobileNumber = user.getMobileNumber();
        userDto.nickname = user.getNickname();
        userDto.age = user.getAge();
        userDto.gender = user.getGender();
        userDto.blackListNY = user.getBlackListNY();
        userDto.blackExpireDate = user.getBlackExpireDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss"));
        userDto.country = CountryDto.of(user.getCountry());

        return userDto;
    }
}
