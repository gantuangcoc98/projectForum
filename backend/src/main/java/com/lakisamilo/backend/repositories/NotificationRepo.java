package com.lakisamilo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.Notification;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    
}
