package com.ssafy.api.service;

import com.ssafy.api.dto.LanguageDto;
import com.ssafy.db.entity.Language;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.LanguageRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.language.bm.Languages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("languageService")
@RequiredArgsConstructor
@Transactional
public class LanguageServiceImpl implements LanguageService{


    private final LanguageRepository languageRepository;

    public Language getLanguageById(Long id){
        Optional<Language> lan = languageRepository.findById(id);
        //없을거 대비
        // if(!ran.present()){}

        return lan.get();
    }

    @Override
    public List<LanguageDto> getAllLanguage(){
        List<LanguageDto> list = new ArrayList<>();
        for(Language language : languageRepository.findAll()){
            list.add(LanguageDto.of(language));
        }
        return list;
    }


    @Override
    public void insertLanguage(LanguageDto languageDto) {
        languageRepository.save(Language.builder()
                .lan(languageDto.getLan())
                .build());
    }


    @Override
    public void removeLanguage(Long id) {
        languageRepository.delete(languageRepository.findById(id).get());
    }
}
