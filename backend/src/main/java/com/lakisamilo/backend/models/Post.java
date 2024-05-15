package com.lakisamilo.backend.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "tblPost")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "postId")
    private long postId;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "creationDate")
    private Date creationDate;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @JsonBackReference
    private User postAuthor;

    @OneToMany(mappedBy = "postComment", cascade = CascadeType.ALL)
    private List<Comment> comments; 

    @Column(name = "state")
    private int state;

    @Column(name = "answered")
    private boolean answered;

    @OneToMany(mappedBy = "postAnswer", cascade = CascadeType.ALL)
    private List<Answer> answers;

    @OneToMany(mappedBy = "postTag", cascade = CascadeType.ALL)
    private List<Tag> tags;

    public Post() {
        this.creationDate = new Date();
        this.state = 0;
        this.answered = false;
    }
}
