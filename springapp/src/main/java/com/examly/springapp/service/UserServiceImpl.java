package com.examly.springapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.config.UserPrinciple;
import com.examly.springapp.exception.UsernameAlreadyExistsException;
import com.examly.springapp.model.LoginDTO;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserDto;
import com.examly.springapp.repository.UserRepo;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo uRepo;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    AuthenticationManager authenticationManager;

    // public UserServiceImpl(JwtUtils jwtUtils, UserRepo uRepo, PasswordEncoder
    // passwordEncoder,
    // AuthenticationManager authenticationManager) {
    // this.jwtUtils = jwtUtils;
    // this.uRepo = uRepo;
    // this.passwordEncoder = passwordEncoder;
    // this.authenticationManager = authenticationManager;
    // }

    @Override
    public User createUser(User user) {
        User existUser = uRepo.findByUsername(user.getUsername());
        if (existUser != null) {
            throw new UsernameAlreadyExistsException("Username already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = uRepo.save(user);
        return user;

    }

    @Override
    public UserDetails loadUserByUsername(String userName) {
        User user = uRepo.findByUsername(userName);
        return new UserPrinciple(user);
    }

    @Override
    public List<User> findAllUsers() {
        return uRepo.findAll();
    }

    @Override
    public LoginDTO loginUser(User user) {
        // Fetch user from DB
        User dbUser = uRepo.findByUsername(user.getUsername());
        if (dbUser == null) {
            throw new RuntimeException("Invalid username or password");
        }
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(dbUser.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            UserDetails userDetails = new UserPrinciple(dbUser);
            String token = jwtUtils.generateToken(userDetails);

            return new LoginDTO(
                    token,
                    dbUser.getUsername(),
                    dbUser.getUserRole(),
                    (int) dbUser.getUserId());
        }

        return null;
    }

    @Override
   public UserDto getById(long id) {
    User user = uRepo.findById(id).orElse(null);
    if (user == null) {
        return null; 
    }
    return new UserDto(user.getUserId(), user.getUsername(), user.getEmail(), user.getMobileNumber());
}

    @Override
    public void deleteUser(int id) {
        long ind = id;
        uRepo.deleteById(ind);
    }

    @Override
    public boolean validateUserByUsername(String username, String password) {
        return uRepo.findByUsernameAndPassword(username, password).isPresent();

    }

    @Override
    public void updateUser(User user) {
        if (uRepo.existsById(user.getUserId())) {
            uRepo.save(user);
        }
    }

    @Override
    public Optional<User> getUserByName(String name) {
        User user = uRepo.findByUsername(name);
        return Optional.ofNullable(user);
    }

}
