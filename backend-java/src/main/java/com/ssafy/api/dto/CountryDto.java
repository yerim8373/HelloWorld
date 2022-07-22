package com.ssafy.api.dto;

import com.ssafy.db.entity.Country;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountryDto {
    public static CountryDto of(Country country){
        return new CountryDto();
    }
}
