package com.lakisamilo.backend.services;

import java.util.ArrayList;
import java.util.List;
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

    public NotificationDTO createNotif(NotificationDTO n) {
        Optional<User> fromOptionalUser = userRepo.findById(n.getFromUser());
        Optional<User> toOptionalUser = userRepo.findByUsername(n.getToUser());

        if (fromOptionalUser.isPresent() && toOptionalUser.isPresent() && fromOptionalUser.get().getState() != -1 && toOptionalUser.get().getState() != -1) {
            User fromUser = fromOptionalUser.get();
            User toUser = toOptionalUser.get();

            String sender = fromUser.getFirstName() + " " + fromUser.getLastName();

            Notification notif = new Notification();
            notif.setNotificationType(n.getNotificationType());

            switch (n.getNotificationType()) {
                case "answer":
                    notif.setContent("Your post has been answered by " + sender + ".");
                    break;
                case "comment":
                    notif.setContent(sender + " has commented on your post.");
                    break;
                case "upVote":
                    notif.setContent(sender + " has upvoted your post.");
                    break;
                case "downVote":
                    notif.setContent(sender + " has downvoted your post.");
                    break;
                case "markedAnswer":
                    notif.setContent("Your answer has been marked from " + sender + "'s post.");
                    break;
                case "follow":
                    notif.setContent(sender + " is now following you.");
                    break;
                default:
                    break;
            }

            notif.setToUser(toUser);
            notif.setFromUser(fromUser);
            notif.setPostId(n.getPostId());

            try {
                fromUser.getNotifInit().add(notif);
                toUser.getNotifications().add(notif);

                notifRepo.save(notif);
                userRepo.save(fromUser);
                userRepo.save(toUser);

                n.setNotificationId(notif.getNotificationId());
                n.setContent(notif.getContent());
                n.setDate(notif.getDate());
                n.setState(notif.getState());

                return n;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public NotificationDTO getNotification(long notificationId) {
        Optional<Notification> notifOptional = notifRepo.findById(notificationId);

        if (notifOptional.isPresent() && notifOptional.get().getState() != -1) {
            Notification notif = notifOptional.get();

            NotificationDTO notifDto = new NotificationDTO();
            notifDto.setNotificationId(notif.getNotificationId());
            notifDto.setContent(notif.getContent());
            notifDto.setNotificationType(notif.getNotificationType());
            notifDto.setFromUser(notif.getFromUser().getUserId());
            notifDto.setToUser(notif.getToUser().getUsername());
            notifDto.setDate(notif.getDate());
            notifDto.setState(notif.getState());
            notifDto.setPostId(notif.getPostId());

            return notifDto;
        }

        return null;
    }

    public List<NotificationDTO> getNotificationsOf(long userId) {
        Optional<User> fromUserOptional = userRepo.findById(userId);

        if (fromUserOptional.isPresent() && fromUserOptional.get().getState() != -1) {
            User user = fromUserOptional.get();

            List<Notification> notifications = notifRepo.findByToUser(user);

            List<NotificationDTO> notificationDtos = new ArrayList<NotificationDTO>();

            notifications.forEach(notification -> notificationDtos.add(getNotification(notification.getNotificationId())));

            return notificationDtos;
        }

        return null;
    }

    public int readNotif(long notifId) {
        Optional<Notification> notifOpt = notifRepo.findById(notifId);

        if (notifOpt.isPresent() && notifOpt.get().getState() == 0) {
            Notification notif = notifOpt.get();

            notif.setState(1);

            notifRepo.save(notif);

            return 1;
        }

        return 0;
    }
}
