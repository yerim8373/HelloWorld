package com.ssafy.api.dto;

import com.ssafy.db.entity.Post;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private long postNo;
    private String title;
    private String content;
    private LocalDateTime regDate; // "yyyy-MM-dd hh:mm:ss"
    private UserDto user;
    private LocalDateTime lastModifiedAt;

    public static PostDto of(Post post){
        return new PostDtoBuilder()
                .postNo(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .regDate(post.getRegDate())
                .user(UserDto.of(post.getUser()))
                .lastModifiedAt(post.getLastModifiedAt())
                .build();
    }
}
