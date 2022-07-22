package com.ssafy.api.service;

import com.ssafy.db.entity.Post;

import java.util.List;

public interface PostService {
    List<Post> getAllPosts();
}
