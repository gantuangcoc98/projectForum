package com.lakisamilo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.Comment;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    
}
