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
public class Tag {
    private @Id int tagId;

    private String title;
    private String description;
    private User author;
    private List<Post> posts;
    private List<User> watchers;

    public Tag(String title, String description, User author, List<Post> posts, List<User> watchers) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.posts = posts;
        this.watchers = watchers;
    }
}
