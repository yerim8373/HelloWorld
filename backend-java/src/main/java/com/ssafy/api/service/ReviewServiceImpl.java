package com.ssafy.api.service;

import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("reviewService")
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    @Override
    public List<Review> getReviewByEmail(String bearerToken) {
        return null;
    }

    @Override
    public List<Review> getAllReviews(String bearerToken) {
        return null;
    }
}
