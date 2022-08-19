package com.ssafy.api.service;

import com.ssafy.api.dto.QuestionDto;
import com.ssafy.db.entity.Question;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service("questionService")
@RequiredArgsConstructor
@Transactional
public class QuestionServiceImpl implements QuestionService{

    private final QuestionRepository questionRepository;
    private final UserService userService;
    private final LanguageService languageService;

    @Override
    public List<QuestionDto> getAllQuestionByEmail(String email) {
        List<QuestionDto> list = new ArrayList<>();
        User user = userService.getUserByEmail(email);
        for(Question question : questionRepository.findAllByUserId(user.getId())){
            list.add(QuestionDto.of(question));
        }
        return list;
    }
    // 힘내라! 화이팅! 우리 선수 힘내라 !몰랑 찾는중 근데 노서치엘리먼트뜨는데 잘 안넣어준거아닐까까 저거 왜저래?

    @Override
    public QuestionDto getRandomQuestionByEmail(String email) {
        List<QuestionDto> list = getAllQuestionByEmail(email);
        return list.get((int)(Math.random()*list.size()));
    }

    @Override
    public void removeQuestion(Long id) {
        questionRepository.delete(questionRepository.findById(id).get());
    }

    @Override
    public void insertQuestion(QuestionDto questionDto) {
        Question question = questionRepository.save(Question.builder()
                .content(questionDto.getContent())
                .build());
        question.setLanguage(languageService.getLanguageById(questionDto.getLanguage().getLanguageId()));
        question.setRegDate(LocalDateTime.now());
    }
}

