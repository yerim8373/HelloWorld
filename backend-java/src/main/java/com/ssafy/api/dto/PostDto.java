package com.ssafy.api.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private long no;
    private String title;
    private String content;
    private String regDate; // "yyyy-MM-dd hh:mm:ss"
    private UserDto user;
    private String lastModifiedAt;
}
