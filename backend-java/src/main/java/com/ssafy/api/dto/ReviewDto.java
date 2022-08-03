package com.ssafy.api.dto;

import com.ssafy.db.entity.Review;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewDto {
    private Long reviewId;
    private String content;
    private int score;

    public static ReviewDto of(Review review){
        return new ReviewDtoBuilder()
                .reviewId(review.getId())
                .content(review.getContent())
                .score(review.getScore())
                .build();
    }
}
