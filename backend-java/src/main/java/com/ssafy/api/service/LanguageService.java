package com.ssafy.api.service;

import com.ssafy.api.dto.LanguageDto;
import com.ssafy.db.entity.Language;

import java.util.List;

public interface LanguageService {
    List<LanguageDto> getAllLanguage();

    void insertLanguage(LanguageDto languageDto);

    void removeLanguage(Long id);
    Language getLanguageById(Long id);
}
