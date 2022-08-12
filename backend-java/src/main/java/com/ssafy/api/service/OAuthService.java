package com.ssafy.api.service;

import com.ssafy.api.oauth.SocialLoginType;
import com.ssafy.common.util.JWToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;

import java.io.IOException;

public interface OAuthService{
    public void request(SocialLoginType socialLoginType) throws IOException;

    JWToken oauthLogin(SocialLoginType socialLoginType, String code);
}
