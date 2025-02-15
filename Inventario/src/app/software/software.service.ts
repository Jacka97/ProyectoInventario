import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Software } from './software';
import { SoftwarePC } from '../software-pc/softwarePC';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  urlOrdenadores = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
  urlApi = 'https://uat-inventarios.proyectos-2daw.es/api/softwControl.php';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicantion/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtengoOrdenadores(): Observable<any>{
    return this.http.get(`${this.urlOrdenadores}`);
  }


  obtengoTodoSoftware(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  obtengoSoftwareID(nsoftware: number): Observable<any> {
    return this.http.get(`${this.urlApi}?id=${nsoftware}`);
  }


  guardaSoftware(software: Software): Observable<any> {
    return this.http.post<any>(this.urlApi, JSON.stringify(software), this.httpOptions);
  }

  

  modificaSoftware(nsoftware: number, software: Software): Observable<any> {
    return this.http.put<any>(`${this.urlApi}?id=${nsoftware}`, JSON.stringify(software), this.httpOptions);
  }


  borraSoftware(nsoftware: number): Observable<any> {
    return this.http.delete(`${this.urlApi}?id=${nsoftware}`);
  }

  
}
