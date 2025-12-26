package com.examly.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.config.UserPrinciple;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDto;
import com.examly.springapp.service.UserServiceImpl;

@RestController
public class UserController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserServiceImpl ser;
    


    public UserController(JwtUtils jwtUtils, UserServiceImpl ser) {
        this.jwtUtils = jwtUtils;
        this.ser = ser;
    }

    // Register User
    @PostMapping("/api/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        User createdUser = ser.createUser(user);
        return ResponseEntity.status(201).body(createdUser); 
    }

@PostMapping("/api/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {
        LoginDTO loginDTO = ser.loginUser(user);
        return ResponseEntity.ok(loginDTO);
}

    @GetMapping("/api/user")
     @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {

        List<User> found = ser.findAllUsers();
        return ResponseEntity.status(200).body(found);
    }

    @DeleteMapping("/api/user/{userId}")
    
    public ResponseEntity<?> deleteUserById(@PathVariable int userId) {
        ser.deleteUser(userId);
        return ResponseEntity.status(200).build(); // OK
    }

    @GetMapping("/api/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserDto> getUserById(@PathVariable long userId){
        UserDto found = ser.getById(userId);
        if(found == null){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(found); 
    }
}
