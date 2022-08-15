package com.ssafy.api.service;

import com.ssafy.api.dto.HeartDto;
import com.ssafy.api.dto.SignUpDto;
import com.ssafy.api.dto.UserDto;
import com.ssafy.db.entity.HeartHistory;
import com.ssafy.db.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(SignUpDto signUpDto);
	void deleteUser(String email);
	User modifyUser(UserDto modifyUser);
	User getUserByEmail(String Email);
	User getUserById(Long id);
	List<HeartHistory> getUserHeartHistory(String bearerToken);
	Integer getHeart(String email);
	void plusHeart(HeartDto heartDto);
	void minusHeart(HeartDto heartDto);
	String saveImage(MultipartFile file) throws IOException;



}
