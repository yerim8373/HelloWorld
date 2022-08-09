package com.ssafy.api.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class GoogleOauth  implements SocialOauth{
    private String GOOGLE_LOGIN_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String GOOGLE_CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;
    @Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
    private String GOOGLE_CALLBACK_URL;
    @Value("${spring.security.oauth2.client.registration.google.scope}")
    private String GOOGLE_SCOPE;
    private final String GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

    @Override
    public String getOauthRedirectURL() {

        Map<String, String> params = new HashMap<>();

        params.put("scope", GOOGLE_SCOPE.replace(',', ' '));
        params.put("response_type", "code");
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("redirect_uri", GOOGLE_CALLBACK_URL);


        String par = params.entrySet().stream().map(p -> p.getKey() + "=" + p.getValue())
                .collect(Collectors.joining("&"));
        return GOOGLE_LOGIN_URL+"?"+par;
    }

    @Override
    public String requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String, String> params = new HashMap<>();
        params.put("client_id", GOOGLE_CLIENT_ID);
        params.put("client_secret", GOOGLE_CLIENT_SECRET);
        params.put("code", code);
        params.put("redirect_uri", GOOGLE_CALLBACK_URL);
        params.put("grant_type", "authorization_code");

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(GOOGLE_TOKEN_URL, params, String.class);

        if(responseEntity.getStatusCode() == HttpStatus.OK) {
            System.out.println(responseEntity.getBody());
            return responseEntity.getBody();
        }
        return "구글 로그인 실패";
    }
}
