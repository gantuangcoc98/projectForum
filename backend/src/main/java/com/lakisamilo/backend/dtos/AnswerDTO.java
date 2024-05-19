package com.lakisamilo.backend.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDTO {

    private long answerId;
    private String content;
    private long postId;
    private String username;
    private String author;
    private int state;
    private Date answerDate;
    private int mark;
    private String updateState;

}
