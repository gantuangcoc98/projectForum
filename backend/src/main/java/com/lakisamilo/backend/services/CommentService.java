package com.lakisamilo.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lakisamilo.backend.dtos.CommentDTO;
import com.lakisamilo.backend.models.Comment;
import com.lakisamilo.backend.models.Post;
import com.lakisamilo.backend.models.User;
import com.lakisamilo.backend.repositories.CommentRepo;
import com.lakisamilo.backend.repositories.PostRepo;
import com.lakisamilo.backend.repositories.UserRepo;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PostRepo postRepo;

    public CommentDTO createComment(CommentDTO c) {
        Optional<User> user = userRepo.findByUsername(c.getUsername());
        Optional<Post> post = postRepo.findById(c.getPostId());

        if (user.isPresent() && user.get().getState() != -1 && post.isPresent() && post.get().getState() != -1) {
            User commentAuthor = user.get();
            Post postComment = post.get();

            Comment newComment = new Comment();
            newComment.setContent(c.getContent());
            newComment.setCommentAuthor(commentAuthor);
            newComment.setPostComment(postComment);

            try {
                commentRepo.save(newComment);
                return getComment(newComment.getCommentId());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public CommentDTO getComment(long commentId) {
        Optional<Comment> comment = commentRepo.findById(commentId);

        if (comment.isPresent()) {
            Comment _comment = comment.get();

            CommentDTO commentDto = new CommentDTO();
            commentDto.setCommentId(_comment.getCommentId());
            commentDto.setContent(_comment.getContent());
            commentDto.setUsername(_comment.getCommentAuthor().getUsername());
            commentDto.setAuthor(_comment.getCommentAuthor().getFirstName() + " " + _comment.getCommentAuthor().getLastName());
            commentDto.setPostId(_comment.getPostComment().getPostId());
            commentDto.setState(_comment.getState());
            commentDto.setDate(_comment.getDate());

            return commentDto;
        }

        return null;
    }

    public int deleteComment(long commentId) {
        Optional<Comment> comment = commentRepo.findById(commentId);

        if (comment.isPresent()) {

            Comment _comment = comment.get();

            if (_comment.getState() == -1) return -1;
            
            _comment.setState(-1);
            
            commentRepo.save(_comment);

            return 1;
        }

        return 0;
    }
}
