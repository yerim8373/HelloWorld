package com.ssafy.db.entity;

import com.ssafy.api.dto.PostDto;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.transaction.annotation.Transactional;

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
@ToString
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
    @JoinColumn(name = "userId")
    private User user;

    public void setUser(User user){
        this.user = user;
        user.getPostList().add(this);
    }

    public void setPost(PostDto postDto){
        this.title = postDto.getTitle();
        this.content = postDto.getContent();
        //분명히 this안에 정보가 잘 들어있는데 db에는 저장이 안될까?
        //영속성 문제? => 엔티티를 직접 꺼내서 수정했기 때문에 영속상태이다.
        //서비스에 @Transactional 붙여줬더니 해결됐다... 영속문제가 맞나..?
        // 영속된 엔티티를 가져와서 수정한건데 왜 반영이 안됐을까....
    }
}
