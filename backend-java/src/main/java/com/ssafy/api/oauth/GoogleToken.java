package com.ssafy.api.oauth;

import lombok.Getter;
import lombok.Setter;
import net.minidev.json.JSONObject;

@Getter
@Setter
public class GoogleToken implements SocialToken{
    private String accessToken;
    private String tokenType;
    private String idToken;
    private String scope;
    private int expiresIn;
    private String email;

    public static GoogleToken of(JSONObject object){
        GoogleToken token = new GoogleToken();

        token.setAccessToken(object.get("access_token").toString());
        token.setTokenType(object.get("token_type").toString());
        token.setScope(object.get("scope").toString());
        token.setIdToken(object.get("id_token").toString());
        token.setExpiresIn(Integer.parseInt(object.get("expires_in").toString()));

        return token;
    }

    @Override
    public String getRefreshToken() {
        return this.idToken;
    }
}

