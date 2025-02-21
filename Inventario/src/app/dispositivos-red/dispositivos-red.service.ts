import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dispositivosRed } from './dispositivos-red';

@Injectable({
  providedIn: 'root'
})
export class DispositivosRedService {

  urlAPI = 'https://inventarios.proyectos-2daw.es/api/redControl.php';
  urlUBI='https://inventarios.proyectos-2daw.es/api/ubiControl.php';
  urlMAR = 'https://inventarios.proyectos-2daw.es/api/marcaControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicantion/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtengoMarcas(): Observable<any>{
    return this.http.get(`${this.urlMAR}`);
  }
  obtengoUbicaciones(): Observable<any>{
    return this.http.get(`${this.urlUBI}`);
  }

  //Obtengo los datos de los dispositivos de red a traves de la api
  obtengoDispoRed(): Observable<any> {
    return this.http.get(`${this.urlAPI}`);
  }

  //Se almacenan nuevos datos de los dispositivos de red en la api
  guardaNuevoDispoRed(dispositivoRed: dispositivosRed): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(dispositivoRed), this.httpOptions);
  }

  //Modifica registros de los dispositivos de red en la api
  modificaDispoRed(ndispoRed: number, dispositivoRed: dispositivosRed): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}?id=${ndispoRed}`, JSON.stringify(dispositivoRed), this.httpOptions);
  }

  //Modifica registros de los ordenadores en la api
  modificaDispRedUbicacion(ndispoRed:number, UbicacionId:number): Observable<any> {
    const body = { idUbicacion: UbicacionId };
    console.log(body);
    return this.http.patch<any>(`${this.urlAPI}/?id=${ndispoRed}`, JSON.stringify(body), this.httpOptions);
  }

  //Se obtienen datos de los dispositivos a traves del id del dispositivo
  obtengoDispoRedID(ndispoRed: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${ndispoRed}`);
  }

  //Se borra un ordenador con el id del dispositivo como parametro de la funcion
  borraDispoRed(ndispoRed: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}?id=${ndispoRed}`);
  }
}
