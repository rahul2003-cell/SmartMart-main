package com.examly.springapp.service;

import java.util.List;

import com.examly.springapp.model.Feedback;

public interface FeedbackService {
   Feedback  createFeedback(Feedback feedback);
   Feedback getFeedbackById(long feedbackId);
   List<Feedback> getAllFeedback();
   boolean deleteFeedback(long feedbackId); 
   List<Feedback> getFeedbackByUserId(long userId);
}

