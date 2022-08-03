package com.ssafy.db.entity;

import com.ssafy.api.dto.PostDto;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@EntityListeners(AuditingEntityListener.class)
public class Post extends BaseEntity{
    private String title;
    private String content;

    @LastModifiedDate
    @Column(updatable = true)
    private LocalDateTime lastModifiedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    //eager로 바꿔도 안들어간다....
    @JoinColumn(name = "userId")
    private User user;

    public void setUser(User user){
        //여기서도 잘 나온다.
        System.out.println(user);
        this.user = user;
        user.getPostList().add(this);
    }

    public void setPost(PostDto post){
        this.title = post.getTitle();
        this.content = post.getContent();
        this.lastModifiedAt = LocalDateTime.now();
    }
}
