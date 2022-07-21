package com.ssafy.api.service;

import com.ssafy.api.dto.SignUpDto;
import com.ssafy.db.entity.Country;
import com.ssafy.db.entity.UserRole;
import com.ssafy.db.repository.CountryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

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

		return userRepository.save(User.builder()
				.email(signUpDto.getEmail())
				.pw(passwordEncoder.encode(signUpDto.getPw()))
				.age(signUpDto.getAge())
				.gender(signUpDto.getGender())
				.avatarSrc(signUpDto.getAvatar())
				.mobileNumber(signUpDto.getMobileNumber())
				.name(signUpDto.getName())
				.nickname(signUpDto.getNickName())
				.country(countryRepository.findById(signUpDto.getCountry()).get())

				.role(UserRole.ROLE_USER)
				.regDate(LocalDateTime.now())
//				.userLanList(signUpDto.getLanguageList())
				.build());
	}

	@Override
	public User getUserByEmail(String Email) {
		Optional<User> user = userRepositorySupport.findUserByEmail(Email);
		if(!user.isPresent()) throw new UsernameNotFoundException("존재하지 않는 이메일입니다.");
		return user.get();
	}
}
