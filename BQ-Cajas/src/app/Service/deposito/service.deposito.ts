import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Deposito } from '../../../Model/Deposito';
import { constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceDeposito {
  
  constructor(private http:HttpClient) { }
  url = constants.pasivesApi.url;  
  
  createDeposito(deposito:Deposito){
    return this.http.post<Deposito>(this.url+'transaccion',deposito);
  }
 
  
}
