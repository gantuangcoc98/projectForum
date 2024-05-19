package com.lakisamilo.backend.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lakisamilo.backend.dtos.PostDTO;
import com.lakisamilo.backend.dtos.VoteDTO;
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
            postDto.setViewCount(found.getViewCount());

            found.getAnswers().forEach(answer -> postDto.getAnswers().add(answer.getAnswerId()));
            found.getComments().forEach(comment -> postDto.getComments().add(comment.getCommentId()));
            found.getTags().forEach(tag -> postDto.getTags().add(tag.getTagId()));
            found.getUpVoters().forEach(user -> postDto.getUpVoters().add(user.getUserId()));
            found.getDownVoters().forEach(user -> postDto.getDownVoters().add(user.getUserId()));

            return postDto;
        }

        return null;
    }

    public List<PostDTO> getPostByIds(List<Long> postIds) {
        List<Post> postList = postRepo.findByPostIdIn(postIds);

        List<PostDTO> postDtos = new ArrayList<PostDTO>();

        postList.forEach(post -> postDtos.add(getPost(post.getPostId())));

        return postDtos;
    }

    public List<PostDTO> getFollowedPost(List<Long> userIds) {
        List<Post> postList = postRepo.findByPostAuthorUserIdIn(userIds);

        List<PostDTO> postDtoList = new ArrayList<PostDTO>();

        postList.forEach(post -> postDtoList.add(getPost(post.getPostId())));

        return postDtoList;
    }

    public List<PostDTO> getAllPosts() {
        List<Post> postLists = postRepo.findAll();
        List<PostDTO> postDtos = new ArrayList<PostDTO>();

        postLists.forEach(post -> postDtos.add(getPost(post.getPostId())));

        return postDtos;
    }

    public int updatePost(PostDTO p) {
        Optional<Post> _p = postRepo.findById(p.getPostId());

        if (_p.isPresent()) {
            Post found = _p.get();

            if (found.getState() == -1) return -1;

            else {
                switch (p.getUpdateState()) {
                    case "edit":
                        found.setTitle(p.getTitle());
                        found.setDescription(p.getDescription());
                        found.setCreationDate(new Date());
                        found.setState(1);
                        break;
                    case "mark":
                        found.setAnswered(p.getAnswered());
                        break;
                    case "unmark":
                        found.setAnswered(0);
                        break;
                    default:
                        break;
                }

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

    public int votePost(VoteDTO v) {
        Optional<Post> post = postRepo.findById(v.getPostId());
        Optional<User> user = userRepo.findByUsername(v.getVoter());


        if (post.isPresent() && post.get().getState() != -1 && user.isPresent() && user.get().getState() != -1) {

            Post postFound = post.get();
            User userFound = user.get();

            List<User> upVoters = postFound.getUpVoters();
            List<User> downVoters = postFound.getDownVoters();

            List<Post> upVotedPosts = userFound.getUpVotedPosts();
            List<Post> downVotedPosts = userFound.getDownVotedPosts();

            switch (v.getVoteState()) {
                case "upVote":
                    if (upVoters.contains(userFound)) {
                        upVoters.remove(userFound);
                        upVotedPosts.remove(postFound);
                    } else {

                        if (downVoters.contains(userFound) && downVotedPosts.contains(postFound)) {
                            downVoters.remove(userFound);
                            downVotedPosts.remove(postFound);
                        }

                        upVoters.add(userFound);
                        upVotedPosts.add(postFound);
                    }

                    break;
                case "downVote":
                    if (downVoters.contains(userFound)) {
                        downVoters.remove(userFound);
                        downVotedPosts.remove(postFound);
                    } else {
                        if (upVoters.contains(userFound) && upVotedPosts.contains(postFound)) {
                            upVoters.remove(userFound);
                            upVotedPosts.remove(postFound);
                        }

                        downVoters.add(userFound);
                        downVotedPosts.add(postFound);
                    }
                    break;
                default:
                    break;
            }

            postFound.setUpVoters(upVoters);
            postFound.setDownVoters(downVoters);
            
            userFound.setUpVotedPosts(upVotedPosts);
            userFound.setDownVotedPosts(downVotedPosts);

            userRepo.save(userFound);
            postRepo.save(postFound);
            return 1;
        }

        return 0;
    }

    public int incrementViewCount(long postId) {
        Optional<Post> post = postRepo.findById(postId);

        if (post.isPresent() && post.get().getState() != -1) {
            Post found = post.get();

            found.setViewCount(found.getViewCount() + 1);

            postRepo.save(found);
            return 1;
        }

        return 0;
    }

}
 