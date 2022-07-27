package com.ssafy.api.service;

import com.ssafy.api.dto.ReviewDto;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ReviewRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service("reviewService")
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    // 리뷰 전체 get
    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // id로 리뷰 get
    @Override
    public List<Review> getReviewsByEmail(String email) {
        return reviewRepository.findReviewByEmail(email);
    }

    // 리뷰 작성
    @Override
    public Review insertReview(ReviewDto reviewDto, String email) {
        return reviewRepository.save(Review.builder()
                        .content(reviewDto.getContent())
                        .score(reviewDto.getScore())
                        .user(userRepository.findByEmail(email).get())
                        .build());
    }

    @Override
    public void removeReview(Long id) {
        reviewRepository.deleteById(id);

    }
}
