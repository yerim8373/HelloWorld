package com.ssafy.api.service;

import com.ssafy.api.dto.HeartDto;
import com.ssafy.api.dto.SignUpDto;
import com.ssafy.common.exception.InvalidValueException;
import com.ssafy.common.util.RedisUtil;
import com.ssafy.db.entity.Gender;
import com.ssafy.db.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
@Rollback
class UserServiceImplTest {
    @Autowired
    UserService userService;
    @Autowired
    RedisUtil redisUtil;

    @BeforeEach
    void setUp(){
        SignUpDto admin = SignUpDto.builder()
                .age(1)
                .email("admin")
                .nickName("admin")
                .gender(Gender.MALE)
                .mobileNumber("admin")
                .pw("admin")
                .name("admin")
                .build();

        SignUpDto user = SignUpDto.builder()
                .age(1)
                .nickName("user")
                .email("user")
                .gender(Gender.MALE)
                .mobileNumber("user")
                .pw("user")
                .name("user")
                .build();
        SignUpDto user2 = SignUpDto.builder()
                .age(1)
                .nickName("user2")
                .email("user2")
                .gender(Gender.MALE)
                .mobileNumber("user2")
                .pw("user2")
                .name("user2")
                .build();
        userService.createUser(admin);
        userService.createUser(user);
        userService.createUser(user2);
    }
    @Test
    public void 하트주고받기() {
        User user = userService.getUserByEmail("user");
        User user2 = userService.getUserByEmail("user2");
        HeartDto heart = HeartDto.builder()
                .fromUser(user.getId())
                .toUser(user2.getId())
                .cnt(1)
                .route("extention")
                .name("")
                .build();
        assertEquals(1, heart.getCnt());
        userService.heart(heart);
//        redisUtil.delete(UserServiceImpl.INFO+user2.getId());
    }

    @Test
    public void 하트사용_예외() {
        User admin = userService.getUserByEmail("admin");
        User user = userService.getUserByEmail("user");

        assertThrows(InvalidValueException.class, ()->{
            HeartDto heart = HeartDto.builder()
                    .fromUser(user.getId())
                    .toUser(admin.getId())
                    .cnt(-1)
                    .route("anything")
                    .name("")
                    .build();

            userService.heart(heart);
        });
    }
}