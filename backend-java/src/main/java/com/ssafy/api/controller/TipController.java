package com.ssafy.api.controller;

import com.ssafy.api.dto.TipDto;
import com.ssafy.api.service.TipService;
import com.ssafy.common.model.response.Response;
import com.ssafy.common.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tip")
public class TipController {
    private final TipService tipService;

    private final Response response;

    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTipByEmail(@RequestHeader("Authorization") String bearerToken){
        String email = jwtTokenUtil.getEmailFromToken(bearerToken);

        return response.success(tipService.getAllTipByEmail(email)
                , "All tip success"
                , HttpStatus.OK);
    }


    @GetMapping("/random")
    public ResponseEntity<?> getTipByEmail(@RequestHeader("Authorization") String bearerToken){
        String email = jwtTokenUtil.getEmailFromToken(bearerToken);

        return response.success(tipService.getRandomTipByEmail(email)
                , "random tip success"
                , HttpStatus.OK);
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertTip(@RequestBody TipDto tipDto){
        tipService.insertTip(tipDto);
        return response.success(HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeTip(@PathVariable Long id){
        tipService.removeTip(id);
        return response.success(HttpStatus.OK);
    }
}