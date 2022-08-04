package com.ssafy.api.service;

import com.ssafy.api.dto.UserLanDto;
import com.ssafy.db.entity.UserLan;

import java.util.List;

public interface UserLanService {
    List<UserLanDto> getUserLanByEmail(String email);
    UserLan insertUserLan(UserLanDto userLanDto);
    void modifyUserLan(UserLanDto userLanDto);
    void removeUserLan(Long id);
}
