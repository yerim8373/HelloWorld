package com.ssafy.api.oauth;

public interface SocialToken {
    public String getAccessToken();
    public String getRefreshToken();
    public String getEmail();
}

