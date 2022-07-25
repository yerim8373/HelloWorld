package com.ssafy.api.service;

import com.ssafy.api.dto.PostDto;
import com.ssafy.db.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
    Post getPostById(Long id);
    void modifyPost(PostDto postDto);
    void removePost(Long id);
}
