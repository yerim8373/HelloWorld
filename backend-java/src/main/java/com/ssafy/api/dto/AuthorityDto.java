package com.ssafy.api.dto;

import com.ssafy.db.entity.Authority;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorityDto {
    private String authName;

    public static AuthorityDto of(Authority authority){
        return AuthorityDto.builder()
                .authName(authority.getAuthName())
                .build();
    }
}
