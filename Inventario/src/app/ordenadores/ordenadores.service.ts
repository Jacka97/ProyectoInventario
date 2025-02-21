import { Injectable } from '@angular/core';
import { Ordenadores } from './ordenadores';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrdenadoresService {
  urlUBI='https://uat-inventarios.proyectos-2daw.es/api/ubiControl.php';
  urlMAR = 'https://uat-inventarios.proyectos-2daw.es/api/marcaControl.php';
  urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
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

  //Obtengo los datos de los ordenadores a traves de la api
  obtengoOrdenadores(): Observable<any> {
    return this.http.get(`${this.urlAPI}`);
  }

  //Se almacenan nuevos datos de los ordenadores en la api
  guardaNuevoOrdenador(ordenadores: Ordenadores): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(ordenadores), this.httpOptions);
  }

  //Modifica registros de los ordenadores en la api
  modificaOrdenador(nordenadores: number, ordenadores: Ordenadores): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}/${nordenadores}`, JSON.stringify(ordenadores), this.httpOptions);
  }

  //Modifica registros de los ordenadores en la api
  modificaOrdenadorUbicacion(nordenadores:number, UbicacionId:number): Observable<any> {   
    const body = { idUbicacion: UbicacionId };
    return this.http.patch<any>(`${this.urlAPI}/?id=${nordenadores}`, JSON.stringify(body), this.httpOptions);
  }

  //Se obtienen datos de los ordenadores a traves del id del ordenador
  obtengoOrdenador(nordenadores: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${nordenadores}`);
  }

  //Se borra un ordenador con el id del ordenador como parametro de la funcion
  borraOrdenador(nordenadores: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}?id=${nordenadores}`);
  }
}