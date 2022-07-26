package com.ssafy.api.service;

import com.ssafy.api.dto.TipDto;
import com.ssafy.db.entity.Language;
import com.ssafy.db.entity.Tip;
import com.ssafy.db.repository.TipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service("tipService")
@RequiredArgsConstructor
@Transactional
public class TipServiceImpl implements TipService{

    private final TipRepository tipRepository;

    @Override
    public List<TipDto> getAllTipsByLan(String lan) {
        List<TipDto> list = new ArrayList<>();
        for(Tip tip : tipRepository.findTipByLan(lan)){
            list.add(TipDto.of(tip));
        }
        return list;
    }

    @Override
    public TipDto getTipByLan(String lan) {
        List<Tip> list = tipRepository.findTipByLan(lan);
        return TipDto.of(list.get((int)(Math.random()*list.size())));
    }

    @Override
    public void insertTip(TipDto tipDto) {

        tipRepository.save(Tip.builder()
                        .content(tipDto.getContent())
                        .build())
                .setLanguage(Language
                        .builder()
                        .lan(tipDto.getLanguageDto().getLan())
                        .build());
    }

    @Override
    public void removeTip(Long id) {
        tipRepository.delete(tipRepository.findById(id).get());
    }
}
