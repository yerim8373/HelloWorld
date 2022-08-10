package com.ssafy.api.oauth;

import org.apache.commons.collections4.MultiValuedMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class KakaoOauth implements SocialOauth{

    @Value("${spring.security.oauth2.client.provider.kakao.authorization-uri}")
    private String KAKAO_LOGIN_URL;
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String KAKAO_ID;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String KAKAO_SECRET;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String KAKAO_REDIRECT_URI;
    @Value("${spring.security.oauth2.client.registration.kakao.scope}")
    private String KAKAO_SCOPE;
    @Value("${spring.security.oauth2.client.registration.kakao.authorization-grant-type}")
    private String KAKAO_GRANT_TYPE;
    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private String KAKAO_TOKEN_URL;

    @Override
    public String getOauthRedirectURL() {
        Map<String, String> params = new HashMap<>();

        params.put("scope", KAKAO_SCOPE.replace(',', ' '));
        params.put("response_type", "code");
        params.put("client_id", KAKAO_ID);
        params.put("redirect_uri", KAKAO_REDIRECT_URI);


        String par = params.entrySet().stream().map(p -> p.getKey() + "=" + p.getValue())
                .collect(Collectors.joining("&"));
        return KAKAO_LOGIN_URL+"?"+par;

    }

    @Override
    public String requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", KAKAO_ID);
        params.add("client_secret", KAKAO_SECRET);
        params.add("grant_type", KAKAO_GRANT_TYPE);
        params.add("code", code);
        params.add("redirect_uri", KAKAO_REDIRECT_URI);

        ResponseEntity<String> response = restTemplate.postForEntity(KAKAO_TOKEN_URL, params, String.class);


        if(response.getStatusCode() == HttpStatus.OK) {
            System.out.println(response.getBody());
            return response.getBody();
        }
        return "카카오 로그인 실패";
    }
}
