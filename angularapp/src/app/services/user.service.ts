import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${APP_URL}/user`);
  }
  getProfileById(id: number):Observable<any>{
    return this.http.get(`${APP_URL}/user/${id}`);
  }

  deleteById(id:number):Observable<any>{
    return this.http.delete<any>(`${APP_URL}/user/${id}`);
  }
}
