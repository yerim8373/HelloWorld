package com.ssafy.api.controller;

import com.ssafy.api.dto.JWTokenDto;
import com.ssafy.api.dto.SignInDTO;
import com.ssafy.api.service.AuthService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JWToken;
import com.ssafy.common.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.response.UserLoginPostRes;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponses;
import io.swagger.annotations.ApiResponse;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

	private final AuthService authService;
	private final Response response;


	@PostMapping("/signin")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = Response.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = Response.class),
			@ApiResponse(code = 500, message = "서버 오류", response = Response.class)
	})
	public ResponseEntity<?> login(@RequestBody @ApiParam(value = "로그인 정보", required = true) SignInDTO signInDTO, HttpServletResponse resp) {

		JWToken jwt = authService.login(signInDTO);

		ResponseCookie cookie = ResponseCookie.from("refresh-token", jwt.getRefreshToken())
				.maxAge(60*60*24*15)
				.httpOnly(true)
				.secure(true)
				.domain("127.0.0.1:8080")
				.path("/")
				.sameSite("None")
				.build();
		resp.setHeader("Set-Cookie", cookie.toString());
		return response.success(JWTokenDto.of(jwt), "", HttpStatus.OK);
	}
}