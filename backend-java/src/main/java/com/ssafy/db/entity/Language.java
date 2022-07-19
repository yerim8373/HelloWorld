package com.ssafy.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Language extends BaseEntity{
    private String name;

    @OneToMany(mappedBy = "language")
    private List<Question> questionList = new ArrayList<>();

}
