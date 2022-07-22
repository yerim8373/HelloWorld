package com.ssafy.api.service;

import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service("userDetailService")
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .map(user->getUserDetail(email, user)).orElseThrow(()->new UsernameNotFoundException("존재하지 않는 email 입니다."));
    }

    private User getUserDetail(String email, com.ssafy.db.entity.User user){
        List<GrantedAuthority> authorities = user.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getAuthName()))
                .collect(Collectors.toList());
        return new User(user.getEmail(), user.getPw(), authorities);
    }
}
