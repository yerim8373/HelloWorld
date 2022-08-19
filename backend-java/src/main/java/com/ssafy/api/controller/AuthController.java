package com.ssafy.api.controller;

import com.ssafy.api.dto.JWTokenDto;
import com.ssafy.api.dto.SignInDTO;
import com.ssafy.api.oauth.SocialLoginType;
import com.ssafy.api.service.AuthService;
import com.ssafy.api.service.OAuthService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JWToken;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.RedisUtil;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.C;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.response.UserLoginPostRes;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Locale;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	private final AuthService authService;
	private final Response response;
	private final OAuthService oAuthService;
	private final RedisUtil redisUtil;
	private final UserService userService;

	@PostMapping("/signin")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = Response.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = Response.class),
			@ApiResponse(code = 500, message = "서버 오류", response = Response.class)
	})
	public ResponseEntity<?> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) SignInDTO signInDTO, HttpServletResponse resp) {

		User user = userService.getUserByEmail(signInDTO.getEmail());
		String key = "BLACK::"+user.getId();
		if(redisUtil.haskey(key)){
			return response.fail("블랙리스트 회원입니다.", HttpStatus.FORBIDDEN);
		}


		JWToken jwt = authService.login(signInDTO);

		ResponseCookie cookie = ResponseCookie.from("refresh-token", jwt.getRefreshToken())
				.maxAge(60*60*24*15)
				.httpOnly(true)
				.secure(true)
				.domain("")
				.path("/")
				.sameSite("None")
				.build();

		resp.setHeader("Set-Cookie", cookie.toString());
		return response.success(JWTokenDto.of(jwt));
	}

	@GetMapping("/signout")
	public ResponseEntity<?> signout(@CookieValue(value="refresh-token", required = false) Cookie cookie, HttpServletResponse resp){
		authService.logout(cookie.getValue());
		cookie.setMaxAge(0);

		return response.success();
	}

	@GetMapping("/reissue")
	public ResponseEntity<?> reissue(@CookieValue(value="refresh-token", required = false) Cookie cookie){
		System.out.println("cookie = " + cookie);

		JWToken jwt = authService.reissue(cookie.getValue());
		System.out.println("jwt = " + jwt.getAccessToken());
		return response.success(JWTokenDto.of(jwt));
	}

	@GetMapping("/oauth2/{type}")
	public void socialLogin(@PathVariable String type) throws IOException {
		oAuthService.request(SocialLoginType.valueOf(type.toUpperCase()));
	}

	@GetMapping("/oauth2/{type}/callback")
	public ResponseEntity<?> callback(@PathVariable String type, @RequestParam String code, HttpServletResponse resp){
		JWToken jwt = oAuthService.oauthLogin(SocialLoginType.valueOf(type.toUpperCase()), code);
		ResponseCookie cookie = ResponseCookie.from("refresh-token", jwt.getRefreshToken())
				.maxAge(60*60*24*15)
				.httpOnly(true)
				.secure(true)
				.domain("")
				.path("/")
				.sameSite("None")
				.build();

		resp.setHeader("Set-Cookie", cookie.toString());
		return response.success(JWTokenDto.of(jwt));
	}
}