import { Injectable } from '@angular/core';
import { Ordenadores } from './ordenadores';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrdenadoresService {
  urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicantion/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtengoOrdenadores(): Observable<any> {
    return this.http.get(`${this.urlAPI}`);
  }

  guardaNuevoOrdenador(ordenadores: Ordenadores): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(ordenadores), this.httpOptions);
  }

  modificaOrdenador(nordenadores: number, ordenadores: Ordenadores): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}/${nordenadores}`, JSON.stringify(ordenadores), this.httpOptions);
  }

  obtengoOrdenador(nordenadores: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${nordenadores}`);
  }

  borraOrdenador(nordenadores: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}?id=${nordenadores}`);
  }
}