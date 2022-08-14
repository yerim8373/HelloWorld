package com.ssafy.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.api.dto.HeartDto;
import com.ssafy.api.dto.SignUpDto;
import com.ssafy.api.dto.UserDto;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
	public static final String INFO = "INFO::";
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



	@Value("${spring.servlet.multipart.location}")
	private String root;

	@Override
	public User createUser(SignUpDto signUpDto){

		User user = userRepository.save(User.builder()
				.email(signUpDto.getEmail())
				.pw(passwordEncoder.encode(signUpDto.getPw()))
				.age(signUpDto.getAge())
				.gender(signUpDto.getGender())
				.mobileNumber(signUpDto.getMobileNumber())
				.name(signUpDto.getName())
				.avatarSrc(signUpDto.getAvatar())
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
		redisUtil.set("CREDENCIAL::"+user.getId(), signUpDto.getPw(), Long.MAX_VALUE/1000);
		return user;
	}

	@Override
	public void deleteUser(String email) {
		User user = userRepository.findByEmail(email).get();
		userRepository.deleteById(user.getId());
	}

	@Override
	public User modifyUser(UserDto userDto) {
		User user = this.getUserById(userDto.getId());
		user.changeUserInfo(userDto);
		user.setPw(passwordEncoder.encode(userDto.getPw()));

		user.setCountry(countryRepository.findById(userDto.getCountry().getId()).get());

		List<UserLanDto> willAdd = new ArrayList<>();
		List<UserLan> isModified = new ArrayList<>();

		for(UserLanDto userLanDto : userDto.getUserLanList()){
			boolean flag = false;
			for(UserLan userLan : user.getUserLanList()){
				if(userLan.getLanguage().getId() == userLanDto.getLanguage().getLanguageId()){
					flag = true;
					userLan.modify(userLanDto);
					isModified.add(userLan);
				}
			}
			if(!flag) willAdd.add(userLanDto);
		}

		user.getUserLanList().stream().filter(ul->!isModified.contains(ul))
						.forEach(ul->user.removeUserLan(ul));
		willAdd.forEach(ul->{
			UserLan userLan = userLanService.insertUserLan(ul);
			userLan.setUser(user);
		});
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


	public String saveImage(MultipartFile multipartFile) throws IOException {
		String path = System.getProperty("user.dir")+"\\"+LocalDateTime.now().getMonthValue();
		logger.info("path : {}",path);
		String fileName = UUID.randomUUID().toString().substring(0, 10)+multipartFile.getOriginalFilename();

		File dest = new File(path, fileName);
		if(!dest.exists()){
			dest.mkdirs();
		}
		multipartFile.transferTo(dest);

		return LocalDateTime.now().getMonthValue()+"`"+fileName;
	}
}