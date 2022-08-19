package com.ssafy.api.controller;

import com.ssafy.api.service.CreditService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Api(value = "Payment API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/payment")
public class CreditController {

    private final CreditService creditService;
    private final JwtTokenUtil jwtTokenUtil;
    private final Response response;

    @GetMapping("/vip")
    @ApiOperation(value = "payment", notes = "<strong>payment 충전금액</strong> 전달")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> addVipPeriod(@RequestHeader("Authorization") String bearerToken){
        creditService.addVipPeriod(jwtTokenUtil.getEmailFromBearerToken(bearerToken));
        return response.success(HttpStatus.OK);
    }
}
