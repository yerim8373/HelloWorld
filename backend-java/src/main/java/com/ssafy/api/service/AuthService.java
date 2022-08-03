package com.ssafy.api.service;

import com.ssafy.api.dto.SignInDTO;
import com.ssafy.common.util.JWToken;

public interface AuthService {
    JWToken login(SignInDTO signInDTO);
    boolean checkRightPw (SignInDTO signInDTO);
}
