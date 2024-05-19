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

import com.lakisamilo.backend.dtos.CommentDTO;
import com.lakisamilo.backend.services.CommentService;

@RestController
public class CommentController {
    
    @Autowired
    private CommentService commentService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "createComment")
    public CommentDTO createComment(@RequestBody CommentDTO c) {
        return commentService.createComment(c);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getComment")
    public CommentDTO getComment(@RequestParam("commentId") long commentId) {
        return commentService.getComment(commentId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getAllComments")
    public List<CommentDTO> getAllComments() {
        return commentService.getAllComments();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "deleteComment")
    public int deleteComment(@RequestParam("commentId") long commentId) {
        return commentService.deleteComment(commentId);
    }
}
