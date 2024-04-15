package com.lakisamilo.projectforum.models;

import java.sql.Date;

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
public class Comment {
    private @Id int commentId;

    private String content;
    private User author;
    private Date date;

    public Comment(String content, User author, Date date) {
        this.content = content;
        this.author = author;
        this.date = date;
    }
}
