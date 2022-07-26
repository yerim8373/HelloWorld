package com.ssafy.api.dto;

import com.ssafy.db.entity.Review;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long reviewId;
    private String regDate;
    private String content;
    private int score;
    private UserDto user;

    public static ReviewDto of(Review review){
        return new ReviewDtoBuilder()
                .reviewId(review.getId())
                .regDate(review.getRegDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .content(review.getContent())
                .score(review.getScore())
                .user(UserDto.of(review.getUser()))
                .build();
    }
}
