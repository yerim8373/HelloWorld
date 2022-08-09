package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Room{

    @Id
    @Column(name = "room_id", length = 50)
    private String roomId;

    @Column(name = "language")
    private String language;

}
