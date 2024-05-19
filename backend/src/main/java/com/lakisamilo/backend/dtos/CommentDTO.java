package com.lakisamilo.backend.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {

    private long commentId;
    private String content;
    private String username;
    private String author;
    private long postId;
    private int state;
    private Date date;

}
