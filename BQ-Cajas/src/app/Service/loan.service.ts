import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  url = constants.cardsApi.url;
  constructor(private httpClient: HttpClient) {}

  getClientLoan(clientId: string) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    console.log(
      this.url + 'prestamoCliente/cliente/' + clientId + '/'
    );
    return this.httpClient.get(
        this.url + 'prestamoCliente/cliente/' + clientId + '/',
      {
        headers: headers,
      }
    );
  }  
}
