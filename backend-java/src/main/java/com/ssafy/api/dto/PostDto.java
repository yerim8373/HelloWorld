package com.ssafy.api.dto;

import com.ssafy.db.entity.Post;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private long postId;
    private String title;
    private String content;
    private UserDto user;
    private String lastModifiedAt;

    public static PostDto of(Post post){
        return new PostDtoBuilder()
                .postId(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .user(UserDto.of(post.getUser()))
                .lastModifiedAt(post.getLastModifiedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss")))
                .build();
    }
}

