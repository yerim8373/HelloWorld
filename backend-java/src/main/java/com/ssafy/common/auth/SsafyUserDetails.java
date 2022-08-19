package com.ssafy.common.auth;

import com.ssafy.common.util.RedisUtil;
import com.ssafy.common.util.UserRole;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 현재 액세스 토큰으로 부터 인증된 유저의 부가 상세정보(활성화 여부, 만료, 롤 등) 정의.
 */
public class SsafyUserDetails implements UserDetails {
	@Autowired
	User user;
	private final RedisUtil redisUtil;
	boolean accountNonExpired;
    boolean accountNonLocked;
    boolean credentialNonExpired;
    boolean enabled = false;
    List<SimpleGrantedAuthority> roles;
    
    public SsafyUserDetails(User user, RedisUtil redisUtil) {
    		super();
    		this.user = user;
		List<SimpleGrantedAuthority> authorities = user.getAuthorities().stream().map(auth -> new SimpleGrantedAuthority(auth.getAuthName()))
				.collect(Collectors.toList());
		this.redisUtil = redisUtil;
		if(redisUtil.haskey("VIP::"+user.getId())){
			authorities.add(new SimpleGrantedAuthority(UserRole.ROLE_VIP));
		}
		this.roles = authorities;
	}
    
    public User getUser() {
    		return this.user;
    }
	@Override
	public String getPassword() {
		return this.user.getPw();
	}
	@Override
	public String getUsername() {
		return this.user.getEmail();
	}
	@Override
	public boolean isAccountNonExpired() {
		return this.accountNonExpired;
	}
	@Override
	public boolean isAccountNonLocked() {
		return this.accountNonLocked;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return this.credentialNonExpired;
	}
	@Override
	public boolean isEnabled() {
		return this.enabled;
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles;
	}
	public void setAuthorities(List<SimpleGrantedAuthority> roles) {
		this.roles = roles;
	}
}

