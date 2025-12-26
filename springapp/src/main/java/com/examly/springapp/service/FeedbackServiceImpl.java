package com.examly.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.FeedbackRepo;
import com.examly.springapp.repository.UserRepo;

@Service

public class FeedbackServiceImpl implements FeedbackService{
    @Autowired
    private FeedbackRepo feedbackRepo;
    @Autowired
    private UserRepo urepo;

    @Override
    public Feedback createFeedback(Feedback fb) {
        if (fb.getUser() == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        User user = urepo.findById(fb.getUser().getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
    
        fb.setUser(user); 
        return feedbackRepo.save(fb);
    }
    

    @Override
    public boolean deleteFeedback(long feedbackId) {
        Feedback found = feedbackRepo.findById(feedbackId).orElse(null);
        if(found == null){
            return false; 
        }
        feedbackRepo.delete(found); 
        return true;
    }


    @Override
    public List<Feedback> getAllFeedback() {
        
        return feedbackRepo.findAll();
    }

    @Override
    public Feedback getFeedbackById(long feedbackId) {
            
        return feedbackRepo.findById(feedbackId).orElse(null);

    }

    @Override
    public List<Feedback> getFeedbackByUserId(long userId) {
        
        return feedbackRepo.findFeedbackByUserId(userId); 
    }

}
