package com.ssafy.api.service;

import com.ssafy.api.dto.ReviewDto;
import com.ssafy.db.entity.Review;
import com.ssafy.db.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("reviewService")
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService{
    private final ReviewRepository reviewRepository;
    private final UserService userService;

    // 리뷰 전체 get
    @Override
    public List<ReviewDto> getAllReviews() {
        List<ReviewDto> list = new ArrayList<>();
        for(Review review : reviewRepository.findAll()){
            list.add(ReviewDto.of(review));
        }
        return list;
    }

    // id로 리뷰 get
    @Override
    public List<ReviewDto> getReviewsByEmail(String email) {
        List<ReviewDto> list = new ArrayList<>();
        for(Review review : reviewRepository.findReviewByEmail(email)){
            list.add(ReviewDto.of(review));
        }
        return list;
    }

    // 리뷰 작성
    @Override
    public void insertReview(ReviewDto reviewDto, String email) {
        Review review = reviewRepository.save(Review.builder()
                .content(reviewDto.getContent())
                .score(reviewDto.getScore())
                .build());
        review.setUser(userService.getUserByEmail(email));
        review.setRegDate(LocalDateTime.now());
    }

    @Override
    public void removeReview(Long id) {
        reviewRepository.deleteById(id);

    }
}
