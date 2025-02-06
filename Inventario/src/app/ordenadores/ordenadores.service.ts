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
  private ordenadores: Ordenadores[] = [];

  obtengoOrdenadores(): Observable<any> {
    return this.http.get(`${this.urlAPI}`);
  }

  obtengoOrdenadoresArr(): Ordenadores[] {
    return this.ordenadores;
  }
  guardaNuevoOrdenador(ordenadores: Ordenadores): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(ordenadores));
  }
  modificaOrdenador(nordenadores: number, ordenadores: Ordenadores): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, { 'id': nordenadores, 'numero': ordenadores.numero, 'idMarca': ordenadores.idMarca, 'modelo': ordenadores.modelo, 'idUbicacion': ordenadores.idUbicacion, 'nombre': ordenadores.nombre, 'tipo': ordenadores.tipo, 'numeroSerie': ordenadores.numeroSerie, 'red': ordenadores.red, 'MACLAN': ordenadores.macLAN, 'MACWIFI': ordenadores.macWifi, 'HD1': ordenadores.hd1, 'HD2': ordenadores.hd2, 'Observaciones': ordenadores.observaciones });
  }
  obtengoOrdenador(nordenadores: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${nordenadores}`);
  }
  borraOrdenador(nordenadores: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${nordenadores}`);
  }
}