package com.lakisamilo.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        } else {
            User newUser = new User();
            newUser.setEmail(u.getEmail());
            newUser.setFirstName(u.getFirstName());
            newUser.setLastName(u.getLastName());
            newUser.setUsername(u.getUsername());
            newUser.setPassword(u.getPassword());

            userRepo.save(newUser);

            return 1;
        }
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

    public User getUser(String username) {
        Optional<User> user = userRepo.findByUsername(username);

        if (user.isPresent()) return user.get();

        return null;
    }
}
