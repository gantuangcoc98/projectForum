package com.lakisamilo.projectforum.models;

import java.sql.Date;
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
public class Post {
    private @Id int postId;

    private String title;
    private String description;
    private Date creationDate;
    private User author;
    private List<Comment> comments;
    private List<Integer> upVotes;
    private List<Integer> downVotes;
    private boolean state;
    private List<Answer> answers;
    private List<Tag> tags;

    public Post(String title, String description, Date creationDate, User author, List<Comment> comments,
            List<Integer> upVotes, List<Integer> downVotes, boolean state, List<Answer> answers, List<Tag> tags) {
        this.title = title;
        this.description = description;
        this.creationDate = creationDate;
        this.author = author;
        this.comments = comments;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.state = state;
        this.answers = answers;
        this.tags = tags;
    }
}
