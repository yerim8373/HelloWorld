package com.ssafy.api.service;

import com.ssafy.api.dto.UserLanDto;
import com.ssafy.db.entity.UserLan;
import com.ssafy.db.repository.UserLanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service("userLanService")
@RequiredArgsConstructor
@Transactional
public class UserLanServiceImpl implements UserLanService{

    private final UserLanRepository userLanRepository;

    @Override
    public List<UserLanDto> getUserLanByEmail(String email) {
        //아직 미구현
        List<UserLanDto> list = new ArrayList<>();
        return list;
    }


    @Override
    public void insertUserLan(UserLanDto userLanDto) {
//        userLanRepository.save(UserLan.builder()
//                .)
    }
}
