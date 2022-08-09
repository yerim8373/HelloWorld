package com.ssafy.api.oauth;

import org.springframework.stereotype.Component;

@Component
public class NaverOauth implements SocialOauth{
    @Override
    public String getOauthRedirectURL() {
        return null;
    }

    @Override
    public String requestAccessToken(String code) {
        return null;
    }
}
