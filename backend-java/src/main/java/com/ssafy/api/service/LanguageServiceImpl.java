package com.ssafy.api.service;

import com.ssafy.api.dto.LanguageDto;
import com.ssafy.db.entity.Language;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LanguageRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("languageService")
@RequiredArgsConstructor
@Transactional
public class LanguageServiceImpl implements LanguageService{


    private final LanguageRepository languageRepository;
    private final UserRepository userRepository;


    @Override
    public LanguageDto getLanguageByEmail(String email){
        User user = userRepository.findByEmail(email).get();
        Language language = languageRepository.findLanguageByUserId(user.getId());
        return LanguageDto.of(language);
    }


    @Override
    public void insertLanguage(String email, Language language) {

    }

    @Override
    public void removeLanguage(String email, Language language) {

    }
}
