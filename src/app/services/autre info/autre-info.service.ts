import { Injectable } from '@angular/core';
import { AutreInfo } from '../../classes/autre info/autre-info';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutreInfoService {

  private  baseUrl = 'http://localhost:8081'
  constructor(private http: HttpClient) { }


  add(autre: AutreInfo) {

   
    return this.http.post(`${this.baseUrl}/AutresInformationsARenseignerSurDeclarationPrixTransfert`,autre);
  }
}
