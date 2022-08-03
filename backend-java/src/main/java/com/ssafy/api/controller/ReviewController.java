package com.ssafy.api.controller;

import com.ssafy.api.dto.ReviewDto;
import com.ssafy.api.service.ReviewService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    private final Response response;
    private final UserService userService;

    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("")
    @ApiOperation(value = "review", notes = "<strong>모든 review</strong> 를 가져온다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getAllReviews(){
        return response.success(reviewService.getAllReviews(), "getAllReviews success", HttpStatus.OK);
    }

    @GetMapping("/email")
    public ResponseEntity<?> getReviewsByEmail(@RequestHeader("Authorization") String bearerToken){
        return response.success(reviewService.getReviewsByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken)), "getPostById success", HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> insertReview(@RequestHeader("Authorization") String bearerToken
            ,@RequestBody ReviewDto reviewDto) {
        reviewService.insertReview(reviewDto, jwtTokenUtil.getEmailFromBearerToken(bearerToken));
        return response.success(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeReview(@PathVariable Long id){
        reviewService.removeReview(id);
        return response.success(HttpStatus.OK);
    }
}
