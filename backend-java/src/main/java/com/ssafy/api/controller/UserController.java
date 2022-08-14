package com.ssafy.api.controller;

import com.ssafy.api.dto.*;
import com.ssafy.api.service.UserLanService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ssafy.api.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.multipart.MultipartFile;
import retrofit2.http.Multipart;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

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
	private final UserLanService userLanService;
	@Value("${spring.servlet.multipart.location}")
	private String root;

	@PostMapping()
	@ApiOperation(value = "회원 가입", notes = "<strong>이메일와 패스워드</strong>를 통해 회원가입 한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<?> register(
			@RequestBody @ApiParam(value="회원가입 정보", required = true)SignUpDto signUpDto) {
		
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
		System.out.println(jwtTokenUtil.getEmailFromBearerToken(bearerToken));
		return response.success(UserDto.of(userService.getUserByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken)))
						,"user information success"
						,HttpStatus.OK);
	}

	@PutMapping("")
	public ResponseEntity<?> modifyUser(@RequestHeader("Authorization") String bearerToken, @RequestBody @ApiParam(value="수정정보", required = true) UserDto userDto) {
		return response.success(UserDto.of(userService.modifyUser(userDto)));
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

	@GetMapping("/heart/history")
	@ApiOperation(value = "회원 하트 정보 조회", notes = "회원 본인의 하트 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<?> getUserHeartHistory(@RequestHeader("Authorization") String bearerToken){
		return response.success(userService.getUserHeartHistory(bearerToken).stream().map(hh-> HeartHistoryDto.of(hh))
								,"heart history success"
								,HttpStatus.OK);
	}

	@PostMapping("/heart")
	public ResponseEntity<?> heart(@RequestBody HeartDto heartDto){
		if(heartDto.getCnt() > 0)
			userService.plusHeart(heartDto);
		else
			userService.minusHeart(heartDto);
		return response.success();
	}

	@PostMapping("/lan")
	public ResponseEntity<?> insertLan(@RequestBody UserLanDto userLanDto){
		userLanService.insertUserLan(userLanDto);
		return response.success(HttpStatus.OK);
	}

	@PutMapping("/lan")
	public ResponseEntity<?> modifyLan(@RequestBody UserLanDto userLanDto){
		userLanService.modifyUserLan(userLanDto);
		return response.success(HttpStatus.OK);
	}

	@GetMapping("/lan")
	public ResponseEntity<?> getAllLan(@RequestHeader("Authorization") String bearerToken){
		return response.success(userLanService.getUserLanByEmail(jwtTokenUtil.getEmailFromBearerToken(bearerToken)));
	}

	@DeleteMapping("/lan/{id}")
	public ResponseEntity<?> removeLan(@PathVariable Long id){
		userLanService.removeUserLan(id);
		return response.success(HttpStatus.OK);
	}

	@PostMapping("/image")
	public ResponseEntity<?> addImage(@RequestPart MultipartFile file)throws IOException{

		return response.success(ImageDto.builder().src(userService.saveImage(file)).build());
	}
	@GetMapping(value = "/image/{src}", produces = {MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_PNG_VALUE})
	public byte[] getImage(@PathVariable String src) throws IOException {
		String[] split = src.split("`");
		InputStream in = new FileInputStream("/home/ubuntu/ssafy/"+split[0]+"/"+split[1]);
		byte[] bytes = IOUtils.toByteArray(in);
		in.close();
		return bytes;
	}
}
