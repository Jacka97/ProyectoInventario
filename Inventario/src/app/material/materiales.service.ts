import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento } from './movimiento';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {
  urlApi='https://inventarios.proyectos-2daw.es/api/moveControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { };
   //Obtengo los datos de los movimientos a traves de la api
  obtengoMovimientosApi(tmove: string, fechamin: any, fechamax: any): Observable<any> {
    return this.http.get(`${this.urlApi}/?tipo=${tmove}&fechamin=${fechamin}&fechamax=${fechamax}`);
  }


}
