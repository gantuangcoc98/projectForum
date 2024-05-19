package com.lakisamilo.backend.models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Data
@AllArgsConstructor
@Table(name = "tblUser")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "userId")
    private long userId;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "postAuthor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("postAuthor")
    private List<Post> posts;

    @OneToMany(mappedBy = "answerAuthor", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("answerAuthor")
    private List<Answer> answers;

    @OneToMany(mappedBy = "commentAuthor", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @ManyToMany
    @JoinTable(
        name = "user_UpVotes",
        joinColumns = @JoinColumn(name = "userId"),
        inverseJoinColumns = @JoinColumn(name = "postId")
    )
    private List<Post> upVotedPosts;

    @ManyToMany
    @JoinTable(
        name = "user_DownVotes",
        joinColumns = @JoinColumn(name = "userId"),
        inverseJoinColumns = @JoinColumn(name = "postId")
    )
    private List<Post> downVotedPosts;

    @OneToMany(mappedBy = "tagAuthor", cascade = CascadeType.ALL)
    private List<Tag> tags;

    @ManyToMany
    @JoinTable(
        name = "user_followers",
        joinColumns = @JoinColumn(name = "userId"),
        inverseJoinColumns = @JoinColumn(name = "followerId")
    )
    private List<User> followers;

    @ManyToMany(mappedBy = "followers")
    private List<User> following;

    @ManyToMany
    @JoinTable(
        name = "user_watchedTag",
        joinColumns = @JoinColumn(name = "userId"),
        inverseJoinColumns = @JoinColumn(name = "tagId")
    )
    List<Tag> watchedTags;

    @Column(name = "email")
    private String email;

    @Column(name = "state")
    private int state;

    @Column(name = "creationDate")
    private Date creationDate;

    public User() {
        this.creationDate = new Date();
        this.state = 0;
    }
}
