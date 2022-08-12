package com.ssafy.api.oauth;

import lombok.Getter;
import lombok.Setter;
import net.minidev.json.JSONObject;

@Getter
@Setter
public class KakaoToken implements SocialToken {
    private String accessToken;
    private String tokenType;
    private String refreshToken;
    private String scope;
    private int expiresIn;
    private int refreshTokenExpiresIn;
    private String email;

    public static KakaoToken of(JSONObject object){
        KakaoToken token = new KakaoToken();

        token.setAccessToken(object.get("access_token").toString());
        token.setTokenType(object.get("token_type").toString());
        token.setScope(object.get("scope").toString());
        token.setRefreshToken(object.get("refresh_token").toString());
        token.setExpiresIn(Integer.parseInt(object.get("expires_in").toString()));
        token.setRefreshTokenExpiresIn(Integer.parseInt(object.get("refresh_token_expires_in").toString()));

        return token;
    }


}
