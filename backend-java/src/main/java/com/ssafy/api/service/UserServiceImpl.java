package com.ssafy.api.service;

import com.ssafy.api.dto.SignUpDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(SignUpDto signUpDto) {
		User user = User.builder().email(signUpDto.getEmail())
				.pw(passwordEncoder.encode(signUpDto.getPw()))
				.age(signUpDto.getAge())
				.gender(signUpDto.getGender())
				.avatarSrc(signUpDto.getAvatar())
				.mobileNumber(signUpDto.getMobileNumber())
				.name(signUpDto.getName())
				.nickname(signUpDto.getNickName())
//				.country(signUpDto.getCountry())
				.userLanList(signUpDto.getLanguageList())
				.build();
		return userRepository.save(user);
	}

	@Override
	public User getUserByEmail(String Email) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepositorySupport.findUserByEmail(Email).get();
		return user;
	}
}
