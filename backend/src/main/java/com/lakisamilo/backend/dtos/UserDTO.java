package com.lakisamilo.backend.dtos;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {

    private long userId;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private int state;
    private List<Long> posts;
    private List<Long> answers;
    private List<Long> tags;
    private List<Long> comments;

    public UserDTO() {
        this.posts = new ArrayList<Long>();
        this.answers = new ArrayList<Long>();
        this.tags = new ArrayList<Long>();
        this.comments = new ArrayList<Long>();
    }

}
