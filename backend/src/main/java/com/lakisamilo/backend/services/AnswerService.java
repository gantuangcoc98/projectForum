package com.lakisamilo.backend.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lakisamilo.backend.dtos.AnswerDTO;
import com.lakisamilo.backend.models.Answer;
import com.lakisamilo.backend.models.Post;
import com.lakisamilo.backend.models.User;
import com.lakisamilo.backend.repositories.AnswerRepo;
import com.lakisamilo.backend.repositories.PostRepo;
import com.lakisamilo.backend.repositories.UserRepo;

@Service
public class AnswerService {
    
    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AnswerRepo answerRepo;

    public AnswerDTO createAnswer(AnswerDTO a) {
        Optional<User> answerAuthor = userRepo.findByUsername(a.getUsername());
        Optional<Post> answerPost = postRepo.findById(a.getPostId());

        if (answerAuthor.isPresent() && answerAuthor.get().getState() != -1 && answerPost.isPresent() && answerPost.get().getState() != -1) {
            User author = answerAuthor.get();
            Post post = answerPost.get();

            Answer answer = new Answer();
            answer.setContent(a.getContent());
            answer.setAnswerAuthor(author);
            answer.setAnswerPost(post);

            try {
                answerRepo.save(answer);
                a.setAnswerId(answer.getAnswerId());
                a.setState(answer.getState());
                a.setAnswerDate(answer.getDate());
                a.setAuthor(answer.getAnswerAuthor().getFirstName() + " " + answer.getAnswerAuthor().getLastName());
                a.setMark(answer.getMark());

                return a;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return null;
    }

    public AnswerDTO getAnswer(long answerId) {
        Optional<Answer> answer = answerRepo.findById(answerId);

        if (answer.isPresent()) {
            Answer found = answer.get();

            AnswerDTO answerDto = new AnswerDTO();
            answerDto.setAnswerId(found.getAnswerId());
            answerDto.setContent(found.getContent());
            answerDto.setPostId(found.getAnswerPost().getPostId());
            answerDto.setUsername(found.getAnswerAuthor().getUsername());
            answerDto.setAuthor(found.getAnswerAuthor().getFirstName() + " " + found.getAnswerAuthor().getLastName());
            answerDto.setState(found.getState());
            answerDto.setAnswerDate(found.getDate());
            answerDto.setMark(found.getMark());

            return answerDto;
        }

        return null;
    }

    public List<AnswerDTO> getAllAnswers() {
        List<Answer> answerList = answerRepo.findAll();
        List<AnswerDTO> answerDtos = new ArrayList<AnswerDTO>();

        answerList.forEach(answer -> answerDtos.add(getAnswer(answer.getAnswerId())));

        return answerDtos;
    }

    public int updateAnswer(AnswerDTO a) {
        Optional<Answer> answer = answerRepo.findById(a.getAnswerId());

        if (answer.isPresent()) {
            Answer newAnswer = answer.get();

            if (newAnswer.getState() == -1) return -1;

            else {

                switch (a.getUpdateState()) {
                    case "edit":
                        newAnswer.setContent(a.getContent());
                        newAnswer.setDate(new Date());
                        newAnswer.setState(1);
                        break;
                    case "mark":
                        newAnswer.setMark(1);
                        break;
                    case "unmark":
                        newAnswer.setMark(0);
                        break;
                    default:
                        break;
                }

                answerRepo.save(newAnswer);
            
                return 1;
            }

        }

        return 0;
    }

    public int deleteAnswer(long answerId) {
        Optional<Answer> answer = answerRepo.findById(answerId);

        if (answer.isPresent()) {
            Answer found = answer.get();

            if (found.getState() == -1) return -1;

            found.setState(-1);
            answerRepo.save(found);
            return 1;
        }

        return 0;
    }
}
