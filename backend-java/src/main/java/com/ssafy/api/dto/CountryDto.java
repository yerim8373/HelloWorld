package com.ssafy.api.dto;

import com.ssafy.db.entity.Country;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CountryDto {
    private long id;

    public static CountryDto of(Country country){
        return new CountryDtoBuilder()
                .id(country.getId())
                .build();
    }
}
