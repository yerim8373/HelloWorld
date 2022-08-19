package com.ssafy.api.service;

import com.ssafy.api.dto.PostDto;
import com.ssafy.api.dto.TipDto;
import com.ssafy.db.entity.Post;

import java.util.List;

public interface TipService {
    List<TipDto> getAllTipByEmail(String email);
    TipDto getRandomTipByEmail(String email);
    void removeTip(Long id);
    void insertTip(TipDto tipDto);

}

