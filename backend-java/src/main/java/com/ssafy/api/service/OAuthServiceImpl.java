package com.ssafy.api.service;

import com.ssafy.api.oauth.SocialLoginType;
import com.ssafy.api.oauth.SocialOauth;
import com.ssafy.api.oauth.SocialToken;
import com.ssafy.common.util.JWToken;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.common.util.RedisUtil;
import com.ssafy.db.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Service("oAuthService")
@Transactional
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService{
    private final List<SocialOauth> socialOauthList;
    private final HttpServletResponse response;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final RedisUtil redisUtil;
    private final CustomPasswordEncoder customPasswordEncoder;

    public void request(SocialLoginType socialLoginType) throws IOException {
        SocialOauth socialOauth = findSocialOauthByType(socialLoginType);
        String redirectURL = socialOauth.getOauthRedirectURL();
        response.sendRedirect(redirectURL);
    }

    @Override
    public JWToken oauthLogin(SocialLoginType socialLoginType, String code) {
        SocialOauth socialOauth = findSocialOauthByType(socialLoginType);
        SocialToken token = socialOauth.requestAccessToken(code);

        User user = userService.getUserByEmail(token.getEmail());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), customPasswordEncoder.decrypt(redisUtil.get("CREDENCIAL::"+user.getId()).toString()));
        Authentication auth = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(auth);


        return jwtTokenUtil.createToken(user.getEmail(), auth);
    }

    private SocialOauth findSocialOauthByType(SocialLoginType socialLoginType){
        return socialOauthList.stream().filter(auth->auth.type() == socialLoginType)
                .findFirst().orElseThrow(()->new IllegalArgumentException("잘못된 소셜 로그인입니다."));
    }

}

