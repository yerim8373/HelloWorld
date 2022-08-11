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
     private String name;
     private String mobileNumber;
     private String nickname;

     private String description;
     private Integer age;
     private String avatarSrc;
     private Gender gender;

     private Set<AuthorityDto> authorities;
     private boolean activated;

     private Boolean blackListNY;
     private String blackExpireDate;
     private CountryDto country;


    private List<ReportDto> reportList;
    private List<ReviewDto> reviewList;
    private List<HeartHistoryDto> heartHistoryList;
    private List<NotificationDto> notificationList;
    private List<PostDto> postList;
    private List<RuntimeDto> runtimeList;
    private List<UserLanDto> userLanList;

    public static UserDto of(User user){
        List<ReportDto> reportList = new ArrayList<>();
        for(Report report : user.getReportList()){
            reportList.add(ReportDto.of(report));
        }

        List<ReviewDto> reviewList = new ArrayList<>();
        for(Review review : user.getReviewList()){
            reviewList.add(ReviewDto.of(review));
        }

        List<NotificationDto> notificationList = new ArrayList<>();
        for(Notification notification : user.getNotificationList()){
            notificationList.add(NotificationDto.of(notification));
        }

        List<HeartHistoryDto> heartHistoryList = new ArrayList<>();
        for(HeartHistory heartHistory : user.getHeartHistoryList()){
            heartHistoryList.add(HeartHistoryDto.of(heartHistory));
        }

        List<PostDto> postList = new ArrayList<>();
        for(Post post : user.getPostList()){
            postList.add(PostDto.of(post));
        }

        List<RuntimeDto> runtimeList = new ArrayList<>();
        for(Runtime runtime : user.getRuntimeList()){
            runtimeList.add(RuntimeDto.of(runtime));
        }

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
                .activated(user.isActivated())
                .blackListNY(user.getBlackListNY())
                .blackExpireDate(user.getBlackExpireDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .country(CountryDto.of(user.getCountry()))
                .reportList(reportList)
                .reviewList(reviewList)
                .heartHistoryList(heartHistoryList)
                .notificationList(notificationList)
                .postList(postList)
                .runtimeList(runtimeList)
                .userLanList(userLanList)
                .build();
    }
}
