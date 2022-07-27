package com.ssafy.api.service;

import com.ssafy.api.dto.SignInDTO;
import com.ssafy.common.exception.handler.InvalidEmailAndPasswordException;
import com.ssafy.common.util.JWToken;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenUtil jwtTokenUtil;

//response.success(JwtTokenUtil.getToken(loginInfo.getEmail()), "login success", HttpStatus.OK)
    @Override
    public JWToken login(SignInDTO signInDTO) {
        // 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
        if (checkRightPw(signInDTO)) {
            // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
//            JwtTokenUtil.getToken(loginInfo.getEmail())
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signInDTO.getEmail(), signInDTO.getPw());
            Authentication auth = authenticationManagerBuilder.getObject().authenticate(token);

            return jwtTokenUtil.createToken(signInDTO, auth);
//            return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", JwtTokenUtil.getToken(loginInfo.getEmail())));
        }

        // 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
//        return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
        throw new InvalidEmailAndPasswordException();
    }

    @Override
    public boolean checkRightPw(SignInDTO signInDTO) {
        User user = userService.getUserByEmail(signInDTO.getEmail());
        return passwordEncoder.matches(signInDTO.getPw(), user.getPw());
    }
}