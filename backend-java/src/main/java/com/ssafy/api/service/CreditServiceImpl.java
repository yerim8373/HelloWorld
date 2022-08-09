package com.ssafy.api.service;

import com.ssafy.common.util.RedisUtil;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("creditService")
@RequiredArgsConstructor
@Transactional
public class CreditServiceImpl implements CreditService {

    private static final String VIP = "VIP::";

    private static final Long month = 1000L*60*60*24*30;

    private final RedisUtil redisUtil;
    private final UserRepository userRepository;

    @Override
    public void addVipPeriod(String email) {
        User user = userRepository.findByEmail(email).get();
        String key = VIP+user.getId();
        Long expireTime = 0L;

        //VIP 사용자 데이터가 있을 때
        if(redisUtil.haskey(key)){
            expireTime = redisUtil.getExpireTime(key);
        }

        redisUtil.set(key, 1, expireTime + month);
    }
}
