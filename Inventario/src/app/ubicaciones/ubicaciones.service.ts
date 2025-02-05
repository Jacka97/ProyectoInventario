import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicacion } from './ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

  urlPhp='https://uat-inventarios.proyectos-2daw.es/';
  urlApi='https://uat-inventarios.proyectos-2daw.es/api/aulaControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { };
  obtengoUbicacionesApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }
  guardaNuevaUbicacionApi(ubicacion:Ubicacion): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, JSON.stringify(ubicacion), this.httpOptions);
  }
  obtengoUbicacionApi(nubi:number):Observable<any> {
    return this.http.get(`${this.urlApi}/${nubi}`);
  }
  modificaUbicacionApi(nubi:number, ubicacion:Ubicacion): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${nubi}`, JSON.stringify(ubicacion), this.httpOptions);
  }
  borraUbicacionApi(nubi:number): Observable<any>{
    return this.http.delete(`${this.urlApi}/${nubi}`);
  }
}
