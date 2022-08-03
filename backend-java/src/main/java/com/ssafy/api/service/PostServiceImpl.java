package com.ssafy.api.service;

import com.ssafy.api.dto.PostDto;
import com.ssafy.db.entity.Post;
import com.ssafy.db.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service("postService")
//혹시 트랜젝셔널 안붙여서???
//이게 왜 돼?
@Transactional
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
        Post post = postRepository.findById(postDto.getPostId()).get();
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
                .build())
                    .setUser(userService.getUserByEmail(email));
    }
}
