package com.lakisamilo.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lakisamilo.backend.dtos.UserDTO;
import com.lakisamilo.backend.models.User;
import com.lakisamilo.backend.repositories.UserRepo;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public int registerUser(User u) {
        Optional<User> user = userRepo.findByUsername(u.getUsername());

        if (user.isPresent()) {
            return 0;
        }

        userRepo.save(u);
        return 1;
    }

    public int loginUser(String username, String password) {
        Optional<User> user = userRepo.findByUsername(username);

        if (user.isPresent()) {
            User found = user.get();

            if (found.getPassword().equals(password)) {
                return 1;
            } else {
                return -1;
            }
        }

        return 0;
    }

    public UserDTO getUser(String username) {
        Optional<User> user = userRepo.findByUsername(username);

        if (user.isPresent()) {
            User found = user.get();
            UserDTO userDto = new UserDTO();
            userDto.setUserId(found.getUserId());
            userDto.setUsername(found.getUsername());
            userDto.setPassword(found.getPassword());
            userDto.setFirstName(found.getFirstName());
            userDto.setLastName(found.getLastName());
            userDto.setEmail(found.getEmail());
            userDto.setState(found.getState());

            found.getPosts().forEach(post -> userDto.getPosts().add(post.getPostId()));
            found.getAnswers().forEach(answer -> userDto.getAnswers().add(answer.getAnswerId()));
            found.getTags().forEach(tag -> userDto.getTags().add(tag.getTagId()));

            return userDto;
        }

        return null;
    }

    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepo.findAll();
        List<UserDTO> userDTOs = new ArrayList<UserDTO>();

        userList.forEach(user -> userDTOs.add(getUser(user.getUsername())));
        return userDTOs;
    }

    public int updateUser(User u) {
        Optional<User> _u = userRepo.findById(u.getUserId());

        if (_u.isPresent()) {
            User found = _u.get();

            if (found.getState() == -1) {
                return -1;
            }

            found.setEmail(u.getEmail());
            found.setFirstName(u.getFirstName());
            found.setLastName(u.getLastName());
            found.setUsername(u.getUsername());
            found.setPassword(u.getPassword());
            found.setState(1);

            userRepo.save(found);
            return 1;
        }

        return 0;
    }

    public int deleteUser(long userId) {
        Optional<User> u = userRepo.findById(userId);

        if (u.isPresent()) {
            User found = u.get();

            if (found.getState() == -1) {
                return -1;
            }

            found.setState(-1);
            userRepo.save(found);

            return 1;
        }

        return 0;
    }
}
