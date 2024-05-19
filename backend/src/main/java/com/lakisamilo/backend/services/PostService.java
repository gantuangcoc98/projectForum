package com.lakisamilo.backend.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lakisamilo.backend.dtos.PostDTO;
import com.lakisamilo.backend.models.Post;
import com.lakisamilo.backend.models.User;
import com.lakisamilo.backend.repositories.PostRepo;
import com.lakisamilo.backend.repositories.UserRepo;

@Service
public class PostService {
    
    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    public int createPost(Post p) {
        Optional<User> u = userRepo.findById(p.getPostAuthor().getUserId());

        if (u.isPresent()) {
            User found = u.get();

            if (found.getState() == -1) return -1;

            p.setPostAuthor(found);
            postRepo.save(p);
            return 1;
        }

        return 0;
    }

    public PostDTO getPost(long postId) {
        Optional<Post> p = postRepo.findById(postId);

        if (p.isPresent()) {
            Post found = p.get();
            PostDTO postDto = new PostDTO();
            postDto.setPostId(found.getPostId());
            postDto.setTitle(found.getTitle());
            postDto.setDescription(found.getDescription());
            postDto.setCreationDate(found.getCreationDate());
            postDto.setPostAuthor(found.getPostAuthor().getFirstName() + " " + found.getPostAuthor().getLastName());
            postDto.setPostUsername(found.getPostAuthor().getUsername());
            postDto.setState(found.getState());
            postDto.setAnswered(found.getAnswered());

            found.getAnswers().forEach(answer -> postDto.getAnswers().add(answer.getAnswerId()));
            found.getComments().forEach(comment -> postDto.getComments().add(comment.getCommentId()));
            found.getTags().forEach(tag -> postDto.getTags().add(tag.getTagId()));

            return postDto;
        }

        return null;
    }

    public List<PostDTO> getAllPosts() {
        List<Post> postLists = postRepo.findAll();
        List<PostDTO> postDtos = new ArrayList<PostDTO>();

        postLists.forEach(post -> postDtos.add(getPost(post.getPostId())));

        return postDtos;
    }

    public int updatePost(Post p) {
        Optional<Post> _p = postRepo.findById(p.getPostId());

        if (_p.isPresent()) {
            Post found = _p.get();

            if (found.getState() == -1) return -1;
            else {
                found.setTitle(p.getTitle());
                found.setDescription(p.getDescription());
                found.setCreationDate(new Date());
                found.setState(1);
                postRepo.save(found);
                return 1;
            }
        }

        return 0;
    }

    public int deletePost(long postId) {
        Optional<Post> post = postRepo.findById(postId);

        if (post.isPresent()) {
            Post update = post.get();

            if (update.getState() == -1) {
                return -1;
            }

            update.setState(-1);
            postRepo.save(update);

            return 1;
        }

        return 0;
    }

}
 