package com.ssafy.api.dto;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDTO {

    private String roomId;
    private String writer;
    private String message;
}