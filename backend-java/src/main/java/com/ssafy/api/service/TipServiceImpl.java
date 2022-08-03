package com.ssafy.api.service;

import com.ssafy.api.dto.TipDto;
import com.ssafy.db.entity.Language;
import com.ssafy.db.entity.Tip;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserLan;
import com.ssafy.db.repository.LanguageRepository;
import com.ssafy.db.repository.TipRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("tipService")
@RequiredArgsConstructor
@Transactional
public class TipServiceImpl implements TipService {

    private final TipRepository tipRepository;
    private final UserRepository userRepository;
    private final LanguageService languageService;
    @Override
    public List<TipDto> getAllTipByEmail(String email) {
        List<TipDto> list = new ArrayList<>();
        User user = userRepository.findByEmail(email).get();
//        Language language = languageService.getLanguageById(user.getId());
        for(Tip tip : tipRepository.findAllByUserId(user.getId())){
            list.add(TipDto.of(tip));
        }
       return list;
    }

    @Override
    public TipDto getRandomTipByEmail(String email) {
        List<TipDto> list = getAllTipByEmail(email);
        return list.get((int)(Math.random()*list.size()));
    }

    @Override
    public void insertTip(TipDto tipDto) {
        tipRepository.save(Tip.builder()
                        .content(tipDto.getContent())
                        .build())
                .setLanguage(Language
                        .builder()
                        .lan(tipDto.getLanguage().getLan())
                        .build());
    }

    @Override
    public void removeTip(Long id) {
        tipRepository.delete(tipRepository.findById(id).get());
    }
}