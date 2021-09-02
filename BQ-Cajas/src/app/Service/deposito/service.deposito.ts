import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Deposito } from '../../../Model/Deposito';

@Injectable({
  providedIn: 'root'
})
export class ServiceDeposito {
  
  constructor(private http:HttpClient) { }
  Url="http://52.146.55.208:8004/api/transaccion";
  
  createDeposito(deposito:Deposito){
    return this.http.post<Deposito>(this.Url,deposito);
  }
 
  
}
