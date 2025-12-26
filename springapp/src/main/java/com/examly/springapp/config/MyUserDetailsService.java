package com.examly.springapp.config;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepo uRepo;
    


    public MyUserDetailsService() {
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = uRepo.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Username does not exist");
        }
        return new UserPrinciple(user);
    }
    
}




