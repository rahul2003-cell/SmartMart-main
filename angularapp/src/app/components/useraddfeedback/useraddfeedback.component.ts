import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService, private aes : AuthService, private router: Router) {}
  feedbackForm!: FormGroup;
  submitted = false; 
  successMessage = '';
  userId = this.aes.getUserId() ; // Replace with dynamic user ID from auth or route


  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      userName: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.feedbackForm.invalid) {
      return;
    }

    const feedback: Feedback = {
      ...this.feedbackForm.value,
      user: { userId: this.userId } 
    };

    this.feedbackService.createFeedback(feedback).subscribe({
      next: () => {
        this.successMessage = 'Feedback submitted successfully!';
        this.feedbackForm.reset();
        this.submitted = false;
        this.router.navigate(['/user/view-feedback'])
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
      }
    });
  }


}
