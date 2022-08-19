package com.ssafy.api.service;

import com.ssafy.api.dto.QuestionDto;

import java.util.List;

public interface QuestionService {
    List<QuestionDto> getAllQuestionByEmail(String email);
    QuestionDto getRandomQuestionByEmail(String email);
    void removeQuestion(Long id);
    void insertQuestion(QuestionDto questionDto);
}

