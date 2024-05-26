import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerateService {

  private  baseUrl = 'http://localhost:8081'
  
  constructor(private http: HttpClient) { 

   
  }

  add() {

   
    return this.http.get(`${this.baseUrl}/generate`);
  }


  
}
