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

import com.lakisamilo.backend.dtos.PostDTO;
import com.lakisamilo.backend.dtos.VoteDTO;
import com.lakisamilo.backend.models.Post;
import com.lakisamilo.backend.services.PostService;

@RestController
public class PostController {
    
    @Autowired
    private PostService postService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "createPost")
    public int createPost(@RequestBody Post p) {
        return postService.createPost(p);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getPost")
    public PostDTO getPost(@RequestParam("postId") long postId) {
        return postService.getPost(postId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getFollowedPost")
    public List<PostDTO> getFollowedPost(@RequestParam List<Long> userIds) {
        return postService.getFollowedPost(userIds);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getPostByIds")
    public List<PostDTO> getPostByIds(@RequestParam List<Long> postIds) {
        return postService.getPostByIds(postIds);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getAllPosts")
    public List<PostDTO> getAllPosts() {
        return postService.getAllPosts();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "updatePost")
    public int updatePost(@RequestBody PostDTO p) {
        return postService.updatePost(p);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "deletePost")
    public int deletePost(@RequestParam("postId") long postId) {
        return postService.deletePost(postId);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "votePost")
    public int votePost(@RequestBody VoteDTO v) {
        return postService.votePost(v);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "incrementViews")
    public int incrementViewCount(@RequestParam("postId") long postId) {
        return postService.incrementViewCount(postId);
    }
}
