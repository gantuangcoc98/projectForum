package com.lakisamilo.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.Notification;
import com.lakisamilo.backend.models.User;

public interface NotificationRepo extends JpaRepository<Notification, Long> {
    List<Notification> findByToUser(User user);
}
