import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from './marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  urlPhp='https://uat-inventarios.proyectos-2daw.es/';
  urlApi='https://uat-inventarios.proyectos-2daw.es/api/marcaControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { };
  obtengoMarcasApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }
  guardaNuevaMarcaApi(marca:Marca): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, JSON.stringify(marca), this.httpOptions);
  }
  obtengoMarcaApi(nmarca:number):Observable<any> {
    return this.http.get(`${this.urlApi}/${nmarca}`);
  }
  modificaMarcaApi(nmarca:number, marca:Marca): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${nmarca}`, JSON.stringify(marca), this.httpOptions);
  }
  borraMarcaApi(nmarca:number): Observable<any>{
    return this.http.delete(`${this.urlApi}/${nmarca}`);
  }
}
