package com.examly.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.service.FeedbackService;

import jakarta.validation.Valid;

@RestController
public class FeedbackController {

    @Autowired
    private FeedbackService ser;

    @PostMapping("/api/feedback")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Feedback> createFeedback(@Valid @RequestBody Feedback fb) {
        if (fb.getUser() == null || fb.getUser().getUserId() == 0) {
            return ResponseEntity.badRequest().build();
        }
        Feedback saved = ser.createFeedback(fb);
        return ResponseEntity.status(201).body(saved);
    }

    @GetMapping("/api/feedback")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Feedback>> getAllFeedback(){
        List<Feedback> found = ser.getAllFeedback();
        if(found.isEmpty()){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(found);
    }

    @GetMapping("/api/feedback/user/{userId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Feedback>> getFeedbackById(@PathVariable long userId){
        List<Feedback> found =  ser.getFeedbackByUserId(userId); 
        if(found.isEmpty()){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(found);
        
    }

    @GetMapping("/api/feedback/feedback/{feedbackId}")
    public ResponseEntity<Feedback> getFeedbackByIId(@PathVariable long feedbackId){
        Feedback found =  ser.getFeedbackById(feedbackId); 
        if(found == null){ 
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.status(200).body(found);
        
    }

    @DeleteMapping("/api/feedback/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> delete(@PathVariable long id){
        boolean found = ser.deleteFeedback(id);
        if(found){
            return ResponseEntity.status(200).build();
        }
        return ResponseEntity.status(404).build();
       
    }

}
