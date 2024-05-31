package com.lakisamilo.backend.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NotificationDTO {
    
    private long notificationId;
    private String notificationType;
    private String content;
    private long fromUser;
    private long toUser;
    private int state;
    private Date date;

    public NotificationDTO() {
        this.state = 0;
        this.date = new Date();
    }

}
