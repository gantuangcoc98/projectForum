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

import com.lakisamilo.backend.dtos.AnswerDTO;
import com.lakisamilo.backend.services.AnswerService;

@RestController
public class AnswerController {
    
    @Autowired
    private AnswerService answerService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "createAnswer")
    public AnswerDTO createAnswer(@RequestBody AnswerDTO a) {
        return answerService.createAnswer(a);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getAnswer")
    public AnswerDTO getAnswer(@RequestParam("answerId") long answerId) {
        return answerService.getAnswer(answerId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getAllAnswers")
    public List<AnswerDTO> getAllAnswers() {
        return answerService.getAllAnswers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "updateAnswer")
    public int updateAnswer(@RequestBody AnswerDTO a) {
        return answerService.updateAnswer(a);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "deleteAnswer")
    public int deleteAnswer(@RequestParam("answerId") long answerId) {
        return answerService.deleteAnswer(answerId);
    }
}
