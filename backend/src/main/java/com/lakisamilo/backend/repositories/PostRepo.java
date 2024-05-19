package com.lakisamilo.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.Post;

public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findByPostAuthorUserIdIn(List<Long> userIds);
    List<Post> findByPostIdIn(List<Long> postIds);
}
