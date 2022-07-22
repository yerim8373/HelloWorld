package com.ssafy.api.service;

import com.ssafy.db.entity.Review;

import java.util.List;

/*
    리뷰 관련 비지니스 로직 Interface
 */
public interface ReviewService {
//    Review saveReview(ReviewDto reviewDto);
    List<Review> getReviewByEmail(String bearerToken);
    List<Review> getAllReviews(String bearerToken);
}
