package com.lakisamilo.projectforum.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private @Id int userId;

    private String firstname;
    private String lastname;
    private String email;
    private String username;
    private String password;
    private List<Post> posts;
    private List<Answer> answers;
    private List<Tag> tags;

    public User(String firstname, String lastname, String email, String username, String password, List<Post> posts,
            List<Answer> answers, List<Tag> tags) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.posts = posts;
        this.answers = answers;
        this.tags = tags;
    }
}
