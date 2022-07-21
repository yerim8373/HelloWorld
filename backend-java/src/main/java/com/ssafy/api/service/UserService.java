package com.ssafy.api.service;

import com.ssafy.api.dto.SignUpDto;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(SignUpDto signUpDto);
	User getUserByEmail(String Email);
}
