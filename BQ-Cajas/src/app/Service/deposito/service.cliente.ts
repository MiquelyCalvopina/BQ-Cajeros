import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Cliente } from '../../Model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ServiceCliente {
  
  constructor(private http:HttpClient) { }
  Url="http://localhost:8080/api/cliente";
  getClientes(){
    return this.http.get<Cliente[]>(this.Url);
  }
  getClienteCodigo(id:String){
    return this.http.get<Cliente>(this.Url+"/"+id);
  }
  createCliente(cliente:Cliente){
    return this.http.post<Cliente>(this.Url,cliente);
  }
  updateCliente(cliente:Cliente){
    return this.http.put<Cliente>(this.Url+"/"+cliente.id,cliente);
  }
  
}
