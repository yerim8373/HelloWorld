package com.ssafy.common.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.ssafy.api.dto.SignInDTO;
import com.ssafy.api.dto.SignUpDto;
import com.ssafy.api.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class JwtTokenUtilTest {

    @Autowired AuthenticationManagerBuilder authenticationManagerBuilder;
    @Autowired JwtTokenUtil jwtTokenUtil;
    @Autowired UserService userService;
    @Test
    public void test() {
//        SignUpDto signUpDto = new SignUpDto();
//        signUpDto.setEmail("ssafy@ssafy.com");
//        signUpDto.setPw("ssafy");
//        signUpDto.setName("ssafy");
//        signUpDto.setMobileNumber("ssafy");
//        signUpDto.setNickName("ssafy");
//        userService.createUser(signUpDto);
//
//        SignInDTO signInDTO = new SignInDTO();
//        signInDTO.setEmail("ssafy@ssafy.com");
//        signInDTO.setPw("ssafy");
//        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(signInDTO.getEmail(), signInDTO.getPw());
//        Authentication auth = authenticationManagerBuilder.getObject().authenticate(token);

        String access = jwtTokenUtil.tempToken();
        System.out.println(jwtTokenUtil.getEmailFromToken("Bearer "+access));

    }
}
