package com.lakisamilo.backend.dtos;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {

    private long userId; // No need
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private int state; // No need 
    private List<Long> posts; // No need
    private List<Long> answers; // No need
    private List<Long> tags; // No need
    private List<Long> comments; // No need

    public UserDTO() {
        this.posts = new ArrayList<Long>();
        this.answers = new ArrayList<Long>();
        this.tags = new ArrayList<Long>();
        this.comments = new ArrayList<Long>();
    }

}
