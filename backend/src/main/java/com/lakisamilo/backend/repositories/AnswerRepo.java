package com.lakisamilo.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lakisamilo.backend.models.Answer;

public interface AnswerRepo extends JpaRepository<Answer, Long> {
    
}
