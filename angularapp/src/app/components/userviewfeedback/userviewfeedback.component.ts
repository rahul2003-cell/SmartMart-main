import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';



@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  displayedColumns: string[] = ['index', 'message', 'rating', 'actions'];
  userFeedbackList: Feedback[] = [];
  userId: number =+ this.aes.getUserId() ;; // Replace with dynamic user ID from auth or route

  constructor(private feedbackService: FeedbackService, private aes :AuthService) {}

  ngOnInit(): void {
    this.loadUserFeedback();
  }

  loadUserFeedback(): void {
    this.feedbackService.getFeedbackByUserId(this.userId).subscribe({
      next: (data) => {
        this.userFeedbackList = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Error loading user feedback:', err);
      }
    });
  }
  deleteFeedback(id){
    this.feedbackService.deleteFeedback(id).subscribe();
  }

}
