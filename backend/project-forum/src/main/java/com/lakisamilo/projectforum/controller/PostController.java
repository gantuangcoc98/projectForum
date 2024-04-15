package com.lakisamilo.projectforum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.lakisamilo.projectforum.services.PostService;

@RestController
public class PostController {
    @Autowired
    PostService postService;
}
