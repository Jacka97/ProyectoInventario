import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dispositivosRed } from './dispositivos-red';

@Injectable({
  providedIn: 'root'
})
export class DispositivosRedService {

  urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/redControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicantion/json'
    })
  }

  constructor(private http: HttpClient) { }

  //Obtengo los datos de los ordenadores a traves de la api
  obtengoDispoRed(): Observable<any> {
    return this.http.get(`${this.urlAPI}`);
  }

  //Se almacenan nuevos datos de los ordenadores en la api
  guardaNuevoDispoRed(dipositivoRed: dispositivosRed): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(dipositivoRed), this.httpOptions);
  }

  //Modifica registros de los ordenadores en la api
  modificaDispoRed(ndispoRed: number, dispositivoRed: dispositivosRed): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}/${ndispoRed}`, JSON.stringify(dispositivoRed), this.httpOptions);
  }

  //Se obtienen datos de los ordenadores a traves del id del ordenador
  obtengoDispoRedID(ndispoRed: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${ndispoRed}`);
  }

  //Se borra un ordenador con el id del ordenador como parametro de la funcion
  borraDispoRed(ndispoRed: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}?id=${ndispoRed}`);
  }
}
