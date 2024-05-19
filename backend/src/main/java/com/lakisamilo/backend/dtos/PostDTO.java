package com.lakisamilo.backend.dtos;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PostDTO {
    
    private long postId;
    private String title;
    private String description;
    private Date creationDate;
    private String postAuthor;
    private String postUsername;
    private List<Long> answers;
    private List<Long> comments;
    private List<Long> tags;

    private List<Long> upVoters;
    private List<Long> downVoters;

    private int state;
    private int answered;
    private String updateState;
    private long viewCount;

    public PostDTO() {
        this.answers = new ArrayList<Long>();
        this.comments = new ArrayList<Long>();
        this.tags = new ArrayList<Long>();
        this.upVoters = new ArrayList<Long>();
        this.downVoters = new ArrayList<Long>();
    }

}
