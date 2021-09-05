import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from '../../../Model/Cliente';
import { constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class ServiceCliente {
  
  constructor(private http:HttpClient) { }
  url="http://52.234.160.244:8002/api/cliente";

  getClient(tipoId:string,id:string){
    return this.http.get<Cliente>(this.url+"/"+tipoId+"/"+id);
  }
  getClientes(){
    console.log(this.http.get<Cliente[]>(this.url))
    return this.http.get<Cliente[]>(this.url);
  }
  
}
