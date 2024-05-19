package com.lakisamilo.backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.User;


public interface UserRepo extends JpaRepository<User, Long>{
    Optional<User> findByUsername(String username);
    List<User> findByUserIdIn(List<Long> userIds);
}
