package com.ssafy.api.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.db.entity.*;
import com.ssafy.db.entity.Runtime;
import lombok.*;

import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
     private Long id;
     private String email;
     private String pw;
     private String name;
     private String mobileNumber;
     private String nickname;

     private String description;
     private Integer age;
     private String avatarSrc;
     private Gender gender;

     private Set<AuthorityDto> authorities;
     private CountryDto country;

    private List<UserLanDto> userLanList;

    public static UserDto of(User user){
        List<UserLanDto> userLanList = new ArrayList<>();
        for(UserLan userLan : user.getUserLanList()){
            userLanList.add(UserLanDto.of(userLan));
        }

        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .mobileNumber(user.getMobileNumber())
                .nickname(user.getNickname())
                .description(user.getDescription())
                .age(user.getAge())
                .avatarSrc(user.getAvatarSrc())
                .gender(user.getGender())
                .country(CountryDto.of(user.getCountry()))
                .userLanList(userLanList)
                .build();
    }
}
