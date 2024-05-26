package com.lakisamilo.backend.models;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;

import com.lakisamilo.backend.services.NotificationService;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@Entity
@AllArgsConstructor
@Table(name = "tblNotification")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "notificationId")
    private long notificationId;

    @Column(name = "notificationType")
    private String notificationType;

    @Column(name = "content")
    private String content;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "toUser")
    private User toUser;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fromUser")
    private User fromUser;

    @Column(name = "postId")
    private long postId;

    @Column(name = "state")
    private int state;

    @Column(name = "date")
    private Date date;

    public Notification() {
        this.state = 0;
        this.date = new Date();
    }
}
