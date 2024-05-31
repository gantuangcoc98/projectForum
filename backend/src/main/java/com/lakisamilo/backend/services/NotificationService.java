package com.lakisamilo.backend.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lakisamilo.backend.dtos.NotificationDTO;
import com.lakisamilo.backend.models.Notification;
import com.lakisamilo.backend.models.User;
import com.lakisamilo.backend.repositories.NotificationRepo;
import com.lakisamilo.backend.repositories.UserRepo;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepo notifRepo;

    @Autowired
    private UserRepo userRepo;

    public NotificationDTO createNotif(NotificationDTO data) {
        Optional<User> user = userRepo.findById(data.getToUser());
        
        if (user.isPresent() && user.get().getState() != -1) {
            User toUser = user.get();

            Notification notif = new Notification();
            notif.setNotificationType(data.getNotificationType());
            notif.setToUser(toUser);
            notif.setDate(new Date());
            notif.setState(0);

            switch(data.getNotificationType()) {
                case "answer":
                    notif.setContent("null");
            }

            toUser.getNotifications().add(notif);

            data.setNotificationId(notif.getNotificationId());
            data.setDate(notif.getDate());

            notifRepo.save(notif);
            userRepo.save(toUser);

            return data;
        }
        return null;
    }

}
