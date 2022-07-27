package com.ssafy.api.controller;

import com.ssafy.api.dto.SignUpDto;
import com.ssafy.api.dto.UserDto;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.HeartHistory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

	private final UserService userService;
	private final Response response;
	private final JwtTokenUtil jwtTokenUtil;

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>이메일와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true) SignUpDto signUpDto) {
		
		//임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		userService.createUser(signUpDto);
		
		return response.success("join success");
	}
	
	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String bearerToken) {
		//Dto로 넘기는 이유가 뭐랬지..?
		return response.success(UserDto.of(userService.getUserByEmail(jwtTokenUtil.getEmailFromToken(bearerToken)))
						,"user information success"
						,HttpStatus.OK);
	}

//  우아래 내용을 좀 더 보고 어떤 식으로 할 것인지 결정해보자.
//	public ResponseEntity<?> getUserInfo(@ApiIgnore Authentication authentication) {
//		/**
//		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
//		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
//		 */
//		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
//		String email = userDetails.getUsername();
//		User user = userService.getUserByEmail(email);
//
//		//country, subscribe
//
//		return response.success(UserDto.of(user), "", HttpStatus.OK);
//	}

	@GetMapping("/heart")
	@ApiOperation(value = "회원 하트 정보 조회", notes = "회원 본인의 하트 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getUserHeartHistory(@RequestHeader("Authorization") String bearerToken){
		return response.success(userService.getUserHeartHistory(bearerToken)
								,"heart history success"
								,HttpStatus.OK);
	}

}
