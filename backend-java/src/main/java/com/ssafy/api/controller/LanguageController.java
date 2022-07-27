package com.ssafy.api.controller;

import com.ssafy.api.dto.LanguageDto;
import com.ssafy.api.service.LanguageService;
import com.ssafy.common.model.response.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/language")
public class LanguageController {
    private final LanguageService languageService;
    private final Response response;

    @GetMapping("/")
    public ResponseEntity<?> getAllLanguage(){
    return response.success(languageService.getAllLanguage()
                            ,"All language success"
                            , HttpStatus.OK);
    }


    @PutMapping("/insert")
    public ResponseEntity<?> insertLanguage(@RequestBody LanguageDto languageDto){
        languageService.insertLanguage(languageDto);
        return response.success(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> removeLanguage(Long id){
        languageService.removeLanguage(id);
        return response.success(HttpStatus.OK);
    }


}
