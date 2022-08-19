package com.ssafy.api.oauth;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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
    private final String KAKAO_REQUEST = "https://kapi.kakao.com/v2/user/me";
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
    public SocialToken requestAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", KAKAO_ID);
        params.add("client_secret", KAKAO_SECRET);
        params.add("grant_type", KAKAO_GRANT_TYPE);
        params.add("code", code);
        params.add("redirect_uri", KAKAO_REDIRECT_URI);

        ResponseEntity<JSONObject> response = restTemplate.postForEntity(KAKAO_TOKEN_URL, params, JSONObject.class);


        if(response.getStatusCode() == HttpStatus.OK) {
            System.out.println(response.getBody());
            KakaoToken token = KakaoToken.of(response.getBody());
            token.setEmail(getEmailFromToken(token));
            return token;
        }
        throw new RuntimeException("카카오 로그인 실패");
    }

    @Override
    public String getEmailFromToken(SocialToken token) {
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", "Bearer "+token.getAccessToken());
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
        ResponseEntity<JSONObject> response = restTemplate.exchange(KAKAO_REQUEST, HttpMethod.GET, entity, JSONObject.class);

        if(response.getStatusCode() == HttpStatus.OK){
            System.out.println(response.getBody().toJSONString());
            JSONObject body = response.getBody();
            Object kakao_account = body.get("kakao_account");
            return ((LinkedHashMap)kakao_account).get("email").toString();

        }
        throw new RuntimeException("kakao 이메일 요청 실패");
    }
}

