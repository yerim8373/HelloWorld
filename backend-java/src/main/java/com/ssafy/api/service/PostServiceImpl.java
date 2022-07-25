package com.ssafy.api.service;

import com.ssafy.api.dto.PostDto;
import com.ssafy.db.entity.Post;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PostRepository;
import com.ssafy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service("postService")
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserService userService;

    @Override
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public Post getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if(post.isPresent()){
           return post.get();
        }
        throw new RuntimeException();
    }

    @Override
    public void modifyPost(PostDto postDto) {
        Post post = getPostById(postDto.getPostNo());
        post.setPost(postDto);
    }

    @Override
    public void removePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }

    @Override
    public void insertPost(PostDto postDto, String email) {
         postRepository.save(
                 Post.builder()
                .content(postDto.getContent())
                .title(postDto.getTitle())
                .lastModifiedAt(LocalDateTime.now())
                .build())
                    .setUser(userService.getUserByEmail(email));
    }
}
