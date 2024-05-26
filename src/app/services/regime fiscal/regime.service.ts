import { Injectable } from '@angular/core';
import { Description } from '../../classes/regime fiscale description/description';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegimeService {

  private  baseUrl = 'http://localhost:8081'
  constructor(private http: HttpClient) { }


  add(description: Description ) {

   
    return this.http.post(`${this.baseUrl}/DéclarationPrixDeTransfert/MontantTransaction/DescriptionTransactionsRegimeFiscalPrivilegie`,description);
  }




}
