package com.lakisamilo.backend.models;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@Table(name = "tblComment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "commentId")
    private long commentId;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User commentAuthor;

    @ManyToOne
    @JoinColumn(name = "postId", nullable = true)
    private Post postComment;

    @Column(name = "date")
    private Date date;

    @Column(name = "state")
    private int state;

    public Comment() {
        this.date = new Date();
        this.state = 0;
    }
}

