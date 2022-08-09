package com.ssafy.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.api.dto.HeartDto;
import com.ssafy.api.dto.SignUpDto;
import com.ssafy.api.dto.UserLanDto;
import com.ssafy.common.exception.InvalidValueException;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.RedisUtil;
import com.ssafy.common.util.UserRole;
import com.ssafy.db.entity.*;
import com.ssafy.db.repository.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
	private static final String INFO = "INFO::";
	private static final String HEART = "HEART";

	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	private final UserRepository userRepository;
	private final CountryRepository countryRepository;
	private final UserLanRepository userLanRepository;
	private final UserLanService userLanService;
	private final HeartHistoryRepository heartHistoryRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenUtil jwtTokenUtil;
	private final RedisUtil redisUtil;

	@Override
	public User createUser(SignUpDto signUpDto) {

//		List<UserLan> list = userLanRepository.findAllById(signUpDto.getLanguageList());
//		for (int i = 0; i < list.size(); i++){
//			System.out.println(list.get(i));
//		}

		User user = userRepository.save(User.builder()
				.email(signUpDto.getEmail())
				.pw(passwordEncoder.encode(signUpDto.getPw()))
				.age(signUpDto.getAge())
				.gender(signUpDto.getGender())
				.avatarSrc(signUpDto.getAvatar())
				.mobileNumber(signUpDto.getMobileNumber())
				.name(signUpDto.getName())
				.nickname(signUpDto.getNickName())
				.country(countryRepository.findById(signUpDto.getCountry()).get())
				.authorities(
						Collections.singleton(Authority.builder()
								.authName(UserRole.ROLE_USER)
								.build())
				)
				.regDate(LocalDateTime.now())
				.build());

		for (UserLanDto userLanDto: signUpDto.getLanguageList()
			 ) {
			UserLan userLan = userLanService.insertUserLan(userLanDto);
			userLan.setUser(user);
		}

		return user;
	}

	@Override
	public User getUserByEmail(String Email) {
		Optional<User> user = userRepository.findByEmail(Email);
		if (!user.isPresent()) throw new UsernameNotFoundException("존재하지 않는 이메일입니다.");
		return user.get();
	}

	@Override
	public User getUserById(Long id) {
		Optional<User> user = userRepository.findUserById(id);
		if (!user.isPresent()) throw new UsernameNotFoundException("존재하지 않는 유저입니다.");
		return user.get();
	}

	@Override
	public List<HeartHistory> getUserHeartHistory(String bearerToken) {
		User user = getUserByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken));
		return user.getHeartHistoryList();
	}

	@Override
	public void plusHeart(HeartDto heartDto){
		saveHeartInRedis(heartDto);
		registHeartHistory(heartDto);
	}
	@Override
	public void minusHeart(HeartDto heartDto){
		saveHeartInRedis(heartDto);
		registHeartHistory(heartDto);
	}

	private void saveHeartInRedis(HeartDto heartDto){
		User user = heartDto.getCnt() > 0 ? getUserById(heartDto.getToUser()) : getUserById(heartDto.getFromUser());
		String key = INFO+user.getId();
		Integer cnt = 0;
		Map<String, Integer> map = null;

		if(redisUtil.haskey(key)){
			map = (Map<String, Integer>)redisUtil.get(key);
			ObjectMapper mapper = new ObjectMapper();
			Integer heart = mapper.convertValue(map.get(HEART), Integer.class);

			cnt = (heart == null) ? heartDto.getCnt() : heart + heartDto.getCnt();
		}
		else{
			map = new ConcurrentHashMap<>();
			cnt = heartDto.getCnt();
		}
		logger.info("heart-count :: user = {}, cnt = {}", user.getId(), cnt);
		if(cnt < 0) throw new InvalidValueException("하트가 부족합니다.");

		map.put(HEART, cnt);

		//왜 1000L로 굳이 나눠줬나요???
		redisUtil.set(key, map, Long.MAX_VALUE/ 1000L);
	}
	private void registHeartHistory(HeartDto heartDto){
		heartHistoryRepository.save(HeartHistory.builder()
						.fromUser(getUserById(heartDto.getFromUser()))
						.toUser(getUserById(heartDto.getToUser()))
						.cnt(heartDto.getCnt())
						.route(Route.value(heartDto.getRoute()))
						.name(heartDto.getName())
						.build());
	}

}