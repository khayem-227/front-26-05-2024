import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../User';

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileService {

  constructor(private http: HttpClient) { }
  private  baseUrl = 'http://localhost:8081'
  add(user: User) {

   
    return this.http.put(`${this.baseUrl}/update`,user);
  }

  
}
