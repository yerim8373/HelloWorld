package com.ssafy.api.service;

import com.ssafy.api.dto.UserLanDto;
import com.ssafy.db.entity.UserLan;
import com.ssafy.db.repository.UserLanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service("userLanService")
@RequiredArgsConstructor
@Transactional
public class UserLanServiceImpl implements UserLanService{

    private final UserLanRepository userLanRepository;
    private final LanguageService languageService;

    @Override
    public List<UserLanDto> getUserLanByEmail(String email) {
        List<UserLanDto> list = new ArrayList<>();

        for (UserLan userLan : userLanRepository.findUserLanByEmail(email)){
            list.add(UserLanDto.of(userLan));
        }
        return list;
    }


    @Override
    public UserLan insertUserLan(UserLanDto userLanDto) {
        UserLan userLan = userLanRepository.save(UserLan.builder()
                .fluent(userLanDto.getFluent())
                .priority(userLanDto.getPriority())
                .build());
        userLan.setLanguage(languageService.getLanguageById(userLanDto.getLanguage().getLanguageId()));
//        userLan.setUser(userLanDto.);
        userLan.setRegDate(LocalDateTime.now());
        return userLan;
    }

    @Override
    public void modifyUserLan(UserLanDto userLanDto) {
//        UserLan userLan = getOne(userLanDto.getUserId());
//        userLan.modify(userLanDto);
    }

    @Override
    public void removeUserLan(Long id) {
        userLanRepository.delete(getOne(id));
    }

    public UserLan getOne(Long id){
        Optional<UserLan> userLan = userLanRepository.findById(id);
        if(!userLan.isPresent()) throw new RuntimeException();

        return userLan.get();
    }
}
