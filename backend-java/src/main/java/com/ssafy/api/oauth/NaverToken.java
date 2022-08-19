package com.ssafy.api.oauth;

import lombok.Getter;
import lombok.Setter;
import net.minidev.json.JSONObject;

@Getter
@Setter
public class NaverToken implements SocialToken{
    private String accessToken;
    private String tokenType;
    private String refreshToken;
    private int expiresIn;
    private String email;

    public static NaverToken of(JSONObject object){
        NaverToken token = new NaverToken();
        token.setAccessToken(object.get("access_token").toString());
        token.setTokenType(object.get("token_type").toString());
        token.setRefreshToken(object.get("refresh_token").toString());
        token.setExpiresIn(Integer.parseInt(object.get("expires_in").toString()));

        return token;
    }


}

