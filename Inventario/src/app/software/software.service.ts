import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Software } from './software';
import { SoftwarePC } from './softwarePC';

@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  urlOrdenadores = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
  urlApi = 'https://uat-inventarios.proyectos-2daw.es/api/softwControl.php';
  urlSoftPcApi = 'https://uat-inventarios.proyectos-2daw.es/api/softPcControl.php';
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applicantion/json'
    })
  }

  constructor(private http: HttpClient) { }

  obtengoOrdenadores(): Observable<any>{
    return this.http.get(`${this.urlOrdenadores}`);
  }

  obtengoSoftwarePC(): Observable<any>{
    return this.http.get(`${this.urlSoftPcApi}`);
  }

  obtengoTodoSoftware(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  obtengoSoftwareID(nsoftware: number): Observable<any> {
    return this.http.get(`${this.urlApi}?id=${nsoftware}`);
  }

  obtengoSoftwarePcID(nsoftware: number): Observable<any> {
    return this.http.get(`${this.urlSoftPcApi}?id=${nsoftware}`);
  }

  guardaSoftware(software: Software): Observable<any> {
    return this.http.post<any>(this.urlApi, JSON.stringify(software), this.httpOptions);
  }

  guardaSoftwarePC(software: SoftwarePC): Observable<any> {
    return this.http.post<any>(this.urlSoftPcApi, JSON.stringify(software), this.httpOptions);
  }

  modificaSoftware(nsoftware: number, software: Software): Observable<any> {
    return this.http.put<any>(`${this.urlApi}?id=${nsoftware}`, JSON.stringify(software), this.httpOptions);
  }

  modificaSoftwarePC(nsoftware: number, software: SoftwarePC): Observable<any> {
    return this.http.put<any>(`${this.urlSoftPcApi}?id=${nsoftware}`, JSON.stringify(software), this.httpOptions);
  }

  borraSoftware(nsoftware: number): Observable<any> {
    return this.http.delete(`${this.urlApi}?id=${nsoftware}`);
  }

  borraSoftwarePC(nsoftware: number): Observable<any> {
    return this.http.delete(`${this.urlSoftPcApi}?id=${nsoftware}`);
  }
}
