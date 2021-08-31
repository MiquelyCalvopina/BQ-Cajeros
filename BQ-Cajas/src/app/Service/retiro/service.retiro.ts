import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Retiro } from '../../Model/Retiro';

@Injectable({
  providedIn: 'root'
})
export class ServiceRetiro {
  
  constructor(private http:HttpClient) { }
  Url="http://localhost:8080/api/transaccion";
  
  createRetiro(cliente:Retiro){
    return this.http.post<Retiro>(this.Url,cliente);
  }
 
  
}
