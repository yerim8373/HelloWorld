package com.ssafy.common.config;

import com.ssafy.api.service.CustomUserDetailService;
import com.ssafy.api.service.OAuthService;
import com.ssafy.api.service.OAuthServiceImpl;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.JwtAuthenticationFilter;
import com.ssafy.common.auth.SsafyUserDetailService;
import com.ssafy.common.exception.handler.JwtAccessDeniedHandler;
import com.ssafy.common.exception.handler.JwtAuthenticationEntryPoint;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.RedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * 인증(authentication) 와 인가(authorization) 처리를 위한 스프링 시큐리티 설정 정의.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomUserDetailService userDetailService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    // Password 인코딩 방식에 BCrypt 암호화 방식 사용
    private final RedisUtil redisUtil;
    private final OAuthService oAuthService;
    private final JwtAccessDeniedHandler accessDeniedHandler;
    private final JwtAuthenticationEntryPoint authenticationEntryPoint;

    // DAO 기반으로 Authentication Provider를 생성
    // BCrypt Password Encoder와 UserDetailService 구현체를 설정
    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        daoAuthenticationProvider.setUserDetailsService(this.userDetailService);
        return daoAuthenticationProvider;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/",
                        "/swagger-ui/**",
                        "/swagger-resources/**",
                        "/v2/api-docs/**",
                        "/webjars/**",
                        "/h2-console/**",
                        "/favicon.com");
    }

    // DAO 기반의 Authentication Provider가 적용되도록 설정
    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()

                .headers()
                .frameOptions()
                .sameOrigin()
                .and()

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 토큰 기반 인증이므로 세션 사용 하지않음
                .and()

                .addFilter(new JwtAuthenticationFilter(authenticationManager(), userService, redisUtil)) //HTTP 요청에 JWT 토큰 인증 필터를 거치도록 필터를 추가
                .authorizeRequests()
                .antMatchers("/","/api/v1/auth/signin", "/api/v1/auth/oauth2/**","/api/v1/user", "/api/v1/user/image/**", "/api/v1/auth/reissue").permitAll()
                .anyRequest().authenticated()//인증이 필요한 URL과 필요하지 않은 URL에 대하여 설정
                .and().cors();
    }
}
