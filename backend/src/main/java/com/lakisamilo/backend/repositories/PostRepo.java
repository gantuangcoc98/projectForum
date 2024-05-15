package com.lakisamilo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.Post;

public interface PostRepo extends JpaRepository<Post, Long> {
    
}
