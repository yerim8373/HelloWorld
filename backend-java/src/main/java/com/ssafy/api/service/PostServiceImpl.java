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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service("postService")
public class PostServiceImpl implements PostService{

    private final PostRepository postRepository;
    private final UserService userService;

    @Override
    public List<PostDto> getAllPosts() {
        List<PostDto> list = new ArrayList<>();
        for(Post post : postRepository.findAll()) {
            list.add(PostDto.of(post));
        }
        return list;
    }

    @Override
    public PostDto getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if(post.isPresent()){
           return PostDto.of(post.get());
        }
        throw new RuntimeException();
    }

    @Override
    public void modifyPost(PostDto postDto) {
        Post post = postRepository.findById(postDto.getPostNo()).get();
        post.setPost(postDto);
    }

    @Override
    public void removePost(Long id) {
        Post post = postRepository.findById(id).get();
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
