package com.ssafy.api.oauth;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.web.reactive.function.client.WebClientAutoConfiguration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.net.URI;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class NaverOauth implements SocialOauth{

    @Value("${spring.security.oauth2.client.provider.naver.authorization-uri}")
    private String NAVER_LOGIN_URL;
    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String NAVER_ID;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String NAVER_SECRET;
    @Value("${spring.security.oauth2.client.registration.naver.redirect-uri}")
    private String NAVER_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.registration.naver.scope}")
    private String NAVER_SCOPE;
    @Value("${spring.security.oauth2.client.registration.naver.authorization-grant-type}")
    private String NAVER_GRANT_TYPE;
    @Value("${spring.security.oauth2.client.provider.naver.token-uri}")
    private String NAVER_TOKEN_URL;
    @Value("${spring.oauth2.naver.state}")
    private String state;

    @Override
    public String getOauthRedirectURL() {
        Map<String, String> params = new HashMap<>();
        SecureRandom secureRandom = new SecureRandom();

        params.put("scope", NAVER_SCOPE.replace(',', ' '));
        params.put("response_type", "code");
        params.put("client_id", NAVER_ID);
        params.put("state", state);
        params.put("redirect_uri", NAVER_REDIRECT_URI);

        String par = params.entrySet().stream().map(p -> p.getKey() + "=" + p.getValue())
                .collect(Collectors.joining("&"));
        return NAVER_LOGIN_URL+"?"+par;
    }

    @Override
    public SocialToken requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", NAVER_ID);
        params.add("client_secret", NAVER_SECRET);
        params.add("grant_type", NAVER_GRANT_TYPE);
        params.add("code", code);
        params.add("state", state);


        ResponseEntity<JSONObject> response = restTemplate.postForEntity(NAVER_TOKEN_URL, params, JSONObject.class);

        if(response.getStatusCode() == HttpStatus.OK) {
            System.out.println(response.getBody());
            return NaverToken.of(response.getBody());
        }
        throw new RuntimeException("네이버 로그인 실패");
    }

    @Override
    public String getEmailFromToken(SocialToken token) {
        return null;
    }
}
