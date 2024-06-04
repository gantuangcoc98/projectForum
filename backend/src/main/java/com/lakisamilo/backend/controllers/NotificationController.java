package com.lakisamilo.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lakisamilo.backend.dtos.NotificationDTO;
import com.lakisamilo.backend.services.NotificationService;

@RestController
public class NotificationController {
    
    @Autowired
    private NotificationService notifService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "notification")
    private NotificationDTO createNotif(@RequestBody NotificationDTO n) {
        return notifService.createNotif(n);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "notification")
    private List<NotificationDTO> getNotificationsOf(@RequestParam("userId") long userId) {
        return notifService.getNotificationsOf(userId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "notification")
    private int readNotif(@RequestParam("notifId") long notifId) {
        return notifService.readNotif(notifId);
    }
}
