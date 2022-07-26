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
public class CountryDto {
    private long id;

    public static CountryDto of(Country country){
        return new CountryDtoBuilder()
                .id(country.getId())
                .build();
    }
}
