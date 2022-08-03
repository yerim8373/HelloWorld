package com.ssafy.api.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignInDTO {
    private String email;
    private String pw;
}
