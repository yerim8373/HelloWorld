package com.ssafy.api.service;

import com.ssafy.db.repository.CreditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("creditService")
@RequiredArgsConstructor
@Transactional
public class CreditServiceImpl {
    private final CreditRepository creditRepository;
    private final UserService userService;

    // 충전금액, 기간 저장
    public void insertCredit()
}
