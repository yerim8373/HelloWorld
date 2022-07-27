package com.ssafy.api.service;

import com.ssafy.api.dto.PostDto;
import com.ssafy.db.entity.Post;

import java.util.List;

public interface PostService {
    List<PostDto> getAllPosts();
    PostDto getPostById(Long id);
    void modifyPost(PostDto postDto);
    void removePost(Long id);
    void insertPost(PostDto postDto, String email);
}
