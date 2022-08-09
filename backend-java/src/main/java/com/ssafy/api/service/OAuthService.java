package com.ssafy.api.service;

import com.ssafy.api.oauth.SocialLoginType;

import java.io.IOException;

public interface OAuthService {
    public void request(SocialLoginType socialLoginType) throws IOException;

    String oauthLogin(SocialLoginType socialLoginType, String code);
}
