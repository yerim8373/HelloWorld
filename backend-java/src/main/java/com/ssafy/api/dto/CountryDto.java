package com.ssafy.api.dto;

import com.ssafy.db.entity.Country;
import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountryDto{

    private String id;

    public static CountryDto of(Country country){
        return new CountryDto();
    }
//    public static CountryDto of(Integer statusCode, String message, CountryDto countryDto){
//        return countryDto;
//    }

}