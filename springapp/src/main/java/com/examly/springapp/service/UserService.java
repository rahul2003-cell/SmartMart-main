package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;

import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDto;

public interface UserService {
    User createUser(User user);
    UserDetails loadUserByUsername(String userName);
    List<User> findAllUsers();
    LoginDTO loginUser(User user);
    UserDto getById(long id);
    void deleteUser(int id);
    boolean validateUserByUsername(String username, String password);
    void updateUser(User user);
    Optional<User> getUserByName(String name);

}
