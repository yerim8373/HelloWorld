package com.ssafy.api.service;

import com.ssafy.api.oauth.GoogleOauth;
import com.ssafy.api.oauth.SocialLoginType;
import com.ssafy.api.oauth.SocialOauth;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService{
    private final List<SocialOauth> socialOauthList;
    private final HttpServletResponse response;

    public void request(SocialLoginType socialLoginType) throws IOException {
        SocialOauth socialOauth = findSocialOauthByType(socialLoginType);
        String redirectURL = socialOauth.getOauthRedirectURL();
        response.sendRedirect(redirectURL);
    }

    @Override
    public String oauthLogin(SocialLoginType socialLoginType, String code) {
        SocialOauth socialOauth = findSocialOauthByType(socialLoginType);
        return socialOauth.requestAccessToken(code);
    }

    private SocialOauth findSocialOauthByType(SocialLoginType socialLoginType){
        return socialOauthList.stream().filter(auth->auth.type() == socialLoginType)
                .findFirst().orElseThrow(()->new IllegalArgumentException("잘못된 소셜 로그인입니다."));
    }
}
