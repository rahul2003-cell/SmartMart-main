import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { APP_URL } from '../app.constants';
@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) { }
  

  createFeedback(feedback: Feedback):Observable<any>{
    
    return this.http.post<any>(`${APP_URL}/feedback`,feedback);
  }

  getAllFeedback():Observable<any[]>{
    return this.http.get<any[]>(`${APP_URL}/feedback`);
  }

  updateFeedback(id:number, feedback: Feedback):Observable<any>{
    return this.http.put<any>(`${APP_URL}/feedback/${id}`,feedback);
  }

  deleteFeedback(id: number):Observable<any>{
    return this.http.delete<any>(`${APP_URL}/feedback/${id}`);
  }

  getFeedbackByUserId(userId: number):Observable<any>{
    return this.http.get<any>(`${APP_URL}/feedback/user/${userId}`);
  }
}
