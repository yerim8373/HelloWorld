package com.ssafy.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.common.util.JWToken;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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