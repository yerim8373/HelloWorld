package com.ssafy.api.controller;

import com.ssafy.api.service.TipService;
import com.ssafy.common.model.response.Response;
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

    @GetMapping("")
    public ResponseEntity<?> getAllTipsByLan(@)


    @GetMapping("/")


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeTip(@PathVariable Long id){
        tipService.removeTip(id);
        return response.success(HttpStatus.OK);
    }
}


