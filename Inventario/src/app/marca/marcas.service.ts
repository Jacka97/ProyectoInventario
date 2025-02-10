import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from './marca';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  urlApi='https://uat-inventarios.proyectos-2daw.es/api/marcaControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  constructor(private http: HttpClient) { };
   //Obtengo los datos de las marcas a traves de la api
  obtengoMarcasApi(): Observable<any> {
    console.log(`${this.urlApi}`);
    return this.http.get(`${this.urlApi}`);
  }
  //Se almacenan nuevos datos de las marcas en la api
  guardaNuevaMarcaApi(marca:Marca): Observable<any> {
    return this.http.post<any>(`${this.urlApi}`, JSON.stringify(marca), this.httpOptions);
  }
   //Se obtienen datos de las marcas a traves del id de la marca
  obtengoMarcaApi(nmarca:number):Observable<any> {
    return this.http.get(`${this.urlApi}/?id=${nmarca}`);
  }

  //Modifica registros de las marcas en la api
  modificaMarcaApi(nmarca:number, marca:Marca): Observable<any>{
    return this.http.put<any>(`${this.urlApi}/${nmarca}`, JSON.stringify(marca), this.httpOptions);
  }
   //Se borra una marca con el id de la marca como parametro de la funcion
  borraMarcaApi(nmarca:number): Observable<any>{
    return this.http.delete(`${this.urlApi}/?id=${nmarca}`);
  }
}