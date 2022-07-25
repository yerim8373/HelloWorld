package com.ssafy.api.service;

import com.ssafy.api.dto.ReviewDto;
import com.ssafy.db.entity.Review;

import java.util.List;

/*
    리뷰 관련 비지니스 로직 Interface
 */
public interface ReviewService {
//    Review saveReview(ReviewDto reviewDto);
    List<Review> getAllReviews();

    List<Review> getReviewsByEmail(String email);

     Review insertReview(ReviewDto reviewDto, String email);

     void removeReview(Long id);
}
