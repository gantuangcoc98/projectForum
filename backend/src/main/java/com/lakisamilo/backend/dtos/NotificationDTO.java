package com.lakisamilo.backend.dtos;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDTO {
    
    private long notificationId;
    private String content;
    private String notificationType;
    private long postId;
    private long fromUser;
    private String toUser;
    private Date date;
    private int state;

}
