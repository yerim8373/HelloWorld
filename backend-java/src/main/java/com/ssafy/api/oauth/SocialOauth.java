package com.ssafy.api.oauth;

public interface SocialOauth {
    String getOauthRedirectURL();
    SocialToken requestAccessToken(String code);
    String getEmailFromToken(SocialToken token);
    default SocialLoginType type(){
        if(this instanceof GoogleOauth)
            return SocialLoginType.GOOGLE;
        else if(this instanceof KakaoOauth)
            return SocialLoginType.KAKAO;
        else if(this instanceof NaverOauth)
            return SocialLoginType.NAVER;
        else return null;
    }
}

