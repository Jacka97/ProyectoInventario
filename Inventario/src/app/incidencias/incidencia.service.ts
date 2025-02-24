import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incidencia } from './incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  urlUBI='https://inventarios.proyectos-2daw.es/api/ubiControl.php';
  urlAPI = 'https://inventarios.proyectos-2daw.es/api/incidenciasControl.php';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicantion/json'
    })
  }

  constructor(private http: HttpClient) { }

  
  obtengoUbicaciones(): Observable<any>{
    return this.http.get(`${this.urlUBI}`);
  }

  //Obtengo los datos de las incidencias a traves de la api
  obtengoIncidencias(): Observable<any> {
    return this.http.get(`${this.urlAPI}`);
  }

  //Se almacenan nuevos datos de los incidencias en la api
  guardaNuevaIncidencia(incidencia: Incidencia): Observable<any> {
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(incidencia), this.httpOptions);
  }

  //Modifica registros de los incidencias en la api
  modificaIncidencia(nincidencia: number, incidencia: Incidencia): Observable<any> {
    return this.http.put<any>(`${this.urlAPI}/${nincidencia}`, JSON.stringify(incidencia), this.httpOptions);
  }

  //Modifica registros de las incidencias en la api
  modificaIncidenciaEstado(nincidencia:number, estado:string, comentarioTecnico:string): Observable<any> {
    const body = { estado: estado, comentarioTecnico:comentarioTecnico};
    return this.http.patch<any>(`${this.urlAPI}/?id=${nincidencia}`, JSON.stringify(body), this.httpOptions);
  }

  //Se obtienen datos de las incidencias a traves del id de la incidencia
  obtengoIncidencia(nincidencia: number): Observable<any> {
    return this.http.get(`${this.urlAPI}?id=${nincidencia}`);
  }

  //Se borra una incidencia con el id de la incidencia como parametro de la funcion
  borraIncidencia(nincidencia: number): Observable<any> {
    return this.http.delete(`${this.urlAPI}?id=${nincidencia}`);
  }
}
