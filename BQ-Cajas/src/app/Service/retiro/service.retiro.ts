import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Retiro } from '../../../Model/Retiro';

@Injectable({
  providedIn: 'root'
})
export class ServiceRetiro {
  
  constructor(private http:HttpClient) { }
  Url="http://52.146.55.208:8004/api/transaccion";
  
  createRetiro(retiro:Retiro){
    return this.http.post<Retiro>(this.Url,retiro);
  }
 
  
}
