package com.ssafy.api.service;

import com.ssafy.api.dto.SignUpDto;
import com.ssafy.db.entity.Country;
import com.ssafy.db.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

import javax.transaction.Transactional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;

	private final CountryRepository countryRepository;

	private final UserRepositorySupport userRepositorySupport;

	private final PasswordEncoder passwordEncoder;

	
	@Override
	public User createUser(SignUpDto signUpDto) {

		Country country = countryRepository.findById(signUpDto.getCountry()).get();

		User user = User.builder().email(signUpDto.getEmail())
				.pw(passwordEncoder.encode(signUpDto.getPw()))
				.age(signUpDto.getAge())
				.gender(signUpDto.getGender())
				.avatarSrc(signUpDto.getAvatar())
				.mobileNumber(signUpDto.getMobileNumber())
				.name(signUpDto.getName())
				.nickname(signUpDto.getNickName())
				.country(country)
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
