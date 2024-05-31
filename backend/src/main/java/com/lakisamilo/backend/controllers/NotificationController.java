package com.lakisamilo.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.lakisamilo.backend.dtos.NotificationDTO;
import com.lakisamilo.backend.services.NotificationService;

@RestController
public class NotificationController {

    @Autowired
    private NotificationService notifService;
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "notification")
    public NotificationDTO createNotif(@RequestBody NotificationDTO data) {
        return notifService.createNotif(data);
    }

}
