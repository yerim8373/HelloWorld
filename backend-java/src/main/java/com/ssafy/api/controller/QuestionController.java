package com.ssafy.api.controller;

import com.ssafy.api.dto.PostDto;
import com.ssafy.api.dto.QuestionDto;
import com.ssafy.api.dto.TipDto;
import com.ssafy.api.service.QuestionService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/question")
public class QuestionController {
    private final QuestionService questionService;
    private final Response response;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("")
    public ResponseEntity<?> getAllQuestionByEmail(@RequestHeader("Authorization")String bearerToken){
        String email = jwtTokenUtil.getEmailFromBearerToken(bearerToken);

        return response.success(questionService.getAllQuestionByEmail(email)
                , "All question success"
                , HttpStatus.OK);
    }

    @GetMapping("/random")
    public ResponseEntity<?> getRandomQuestionByEmail(@RequestHeader("Authorization") String bearerToken){
        String email = jwtTokenUtil.getEmailFromBearerToken(bearerToken);

        return response.success(questionService.getRandomQuestionByEmail(email)
                , "random question success"
                , HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> insertQuestion(@RequestBody QuestionDto questionDto){
        questionService.insertQuestion(questionDto);
        return response.success(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeQuestion(@PathVariable Long id){
        questionService.removeQuestion(id);
        return response.success(HttpStatus.OK);
    }
}

