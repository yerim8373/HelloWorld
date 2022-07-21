package com.ssafy.api.dto;

import com.ssafy.common.util.JWToken;

public class JWTokenDto {
    private String grantType;
    private String accessToken;

    public static JWTokenDto of(JWToken token){
        JWTokenDto jwToken = new JWTokenDto();
        jwToken.accessToken = token.getAccessToken();
        jwToken.grantType = "Bearer";
        return jwToken;
    }
}
