package com.ssafy.db.entity;

import com.ssafy.api.dto.PostDto;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 2022-07-19
 * 타 문화에 대한 팁 테이블
 * made by 홍주성
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Post extends BaseEntity{
    private String title;
    private String content;

    private LocalDateTime lastModifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user;

    public void setUser(User user){
        this.user = user;
        user.getPostList().add(this);
    }

    public void setPost(PostDto post){
        this.title = post.getTitle();
        this.content = post.getContent();
        this.lastModifiedAt = LocalDateTime.now();
    }
}
