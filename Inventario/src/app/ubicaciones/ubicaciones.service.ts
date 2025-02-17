import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicacion } from './ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {

 
  urlApi='https://inventarios.proyectos-2daw.es/api/ubiControl.php';
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
    return this.http.get(`${this.urlApi}/?id=${nubi}`);
  }
  modificaUbicacionApi(nubi:number, ubicacion:Ubicacion): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/?id=${nubi}`, JSON.stringify(ubicacion), this.httpOptions);
  }
  borraUbicacionApi(nubi:number): Observable<any>{
    return this.http.delete(`${this.urlApi}/?id=${nubi}`);
  }
}
