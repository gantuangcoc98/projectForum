package com.lakisamilo.backend.models;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    
    @Autowired
    private NotifService notifService;

    @Id
    @GeneratedValue(strategy = Gene)

}
