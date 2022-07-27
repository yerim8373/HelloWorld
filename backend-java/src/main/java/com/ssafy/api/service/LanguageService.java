package com.ssafy.api.service;

import com.ssafy.api.dto.LanguageDto;
import com.ssafy.db.entity.Language;

import java.util.List;

public interface LanguageService {
    LanguageDto getLanguageByEmail(String email);
    void insertLanguage(String email, Language language);
    void removeLanguage(String email, Language language);

}
