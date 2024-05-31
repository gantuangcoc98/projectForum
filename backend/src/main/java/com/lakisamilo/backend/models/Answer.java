package com.lakisamilo.backend.models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

@Entity
@Data
@AllArgsConstructor
@Table(name = "tblAnswer")
public class Answer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "answerId")
    private long answerId;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @JsonIgnoreProperties("answers")
    private User answerAuthor;

    @ManyToOne
    @JoinColumn(name = "postId", nullable = false)
    @JsonIgnoreProperties("answers")
    private Post answerPost;

    @Column(name = "date")
    private Date date;

    @Column(name = "state")
    private int state;

    @Column(name = "mark")
    private int mark;

    public Answer() {
        this.date = new Date();
        this.state = 0;
        this.mark = 0;
    }
}
