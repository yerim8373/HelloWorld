package com.ssafy.api.dto;

import com.ssafy.db.entity.Country;

public class CountryDto {
    public static CountryDto of(Country country){
        return new CountryDto();
    }
}
