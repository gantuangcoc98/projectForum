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

import com.lakisamilo.backend.models.User;
import com.lakisamilo.backend.models.UserCredentials;
import com.lakisamilo.backend.services.UserService;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "registerUser")
    public int registerUser(@RequestBody User u) {
        return userService.registerUser(u);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getUser")
    public User getUser(@RequestParam("username") String username) {
        return userService.getUser(username);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "getAllUsers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "updateUser")
    public int updateUser(@RequestBody User u) {
        return userService.updateUser(u);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "deleteUser")
    public int deleteUser(@RequestParam("userId") long userId) {
        return userService.deleteUser(userId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "login")
    public int loginUser(@RequestBody UserCredentials u) {
        return userService.loginUser(u.getUsername(), u.getPassword());
    }
    
}