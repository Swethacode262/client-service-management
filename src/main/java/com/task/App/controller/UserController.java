package com.task.App.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.task.App.entity.User;
import com.task.App.repo.UserRepo;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired private UserRepo repo;

    @PostMapping("/register")
    public User register(@Valid @RequestBody User u, BindingResult result) {
    	 if (result.hasErrors()) {
    	        String msg = result.getAllErrors().get(0).getDefaultMessage();
    	        throw new RuntimeException(msg);
    	    }

        if (repo.findByEmail(u.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        return repo.save(u);
    }

    @PostMapping("/login")
    public User login(@RequestBody User u) {
        return repo.findByEmail(u.getEmail())
                   .filter(user -> user.getPassword().equals(u.getPassword()))
                   .map(user -> {
                       user.setPassword(null); // hide password
                       return user;
                   })
                   .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }

    }

