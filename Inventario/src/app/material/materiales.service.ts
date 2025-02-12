import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimiento } from './movimiento';

@Injectable({
  providedIn: 'root'
})
export class MaterialesService {
  urlApi='https://uat-inventarios.proyectos-2daw.es/api/movControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { };
   //Obtengo los datos de los movimientos a traves de la api
  obtengoMovimientosApi(tmove: string, fechamin: any, fechamax: any): Observable<any> {
    console.log(`${this.urlApi}`);
    return this.http.get(`${this.urlApi}/?tipo=${tmove}&fechamin=${fechamin}&fechamax=${fechamax}`);
  }
  

  /*

  //Se almacenan nuevos datos de los movimientos en la api
  guardaNuevaMovimientoApi(movimiento:Movimiento): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, JSON.stringify(movimiento), this.httpOptions);
  }
   //Se obtienen datos de los movimientos a traves del id de el movimiento
  obtengoMovimientoApi(nmove:number):Observable<any> {
    return this.http.get(`${this.urlApi}/?id=${nmove}`);
  }

  //Modifica registros de los movimientos en la api
  modificaMovimientoApi(nmove:number, movimiento:Movimiento): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${nmove}`, JSON.stringify(movimiento), this.httpOptions);
  }
   //Se borra un movimiento con el id de el movimiento como parametro de la funcion
  borraMovimientoApi(nmove:number): Observable<any>{
    return this.http.delete(`${this.urlApi}/?id=${nmove}`);
  }

  */
}
