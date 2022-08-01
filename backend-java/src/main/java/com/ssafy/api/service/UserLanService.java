package com.ssafy.api.service;

import com.ssafy.api.dto.UserLanDto;

import java.util.List;

public interface UserLanService {
    List<UserLanDto> getUserLanByEmail(String email);
    void insertUserLan(UserLanDto userLanDto);
    void modifyUserLan(UserLanDto userLanDto);
    void removeUserLan(Long id);
}
