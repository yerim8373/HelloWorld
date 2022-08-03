package com.ssafy.common.util;

import com.ssafy.api.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.transaction.annotation.Transactional;

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
        System.out.println(jwtTokenUtil.getEmailFromBearerToken("Bearer "+access));

    }
}
