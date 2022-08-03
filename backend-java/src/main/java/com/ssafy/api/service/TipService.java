package com.ssafy.api.service;

import com.ssafy.api.dto.PostDto;
import com.ssafy.api.dto.TipDto;
import com.ssafy.db.entity.Post;

import java.util.List;

public interface TipService {
    List<TipDto> getAllTipsByLan(String lan);
    TipDto getTipByLan(String lan);
    void removeTip(Long id);
    void insertTip(TipDto tipDto);

}
