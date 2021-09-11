import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { constants } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
    
  baseUrl = constants.pasivesApi.url;
  constructor(private http: HttpClient) { }

  obtainProducts(clientCode :String): Observable<Object>{
    return this.http.get(this.baseUrl + 'clienteProductoPasivo/codcliente/'+clientCode);
  }

  obtainOneProduct(cuentaId: String): Observable<Object>{
    console.log(this.baseUrl+'clienteProductoPasivo/nroCuenta/'+cuentaId);
      return this.http.get(this.baseUrl+'clienteProductoPasivo/nroCuenta/'+cuentaId);
  }

}