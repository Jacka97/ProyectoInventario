import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SoftwarePC } from '../software-pc/softwarePC';

@Injectable({
  providedIn: 'root'
})
export class SoftwarePcService {

  urlOrdenadores = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
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

  obtengoSoftwarePcID(nsoftware: number): Observable<any> {
    return this.http.get(`${this.urlSoftPcApi}?id=${nsoftware}`);
  }

  guardaSoftwarePC(software: SoftwarePC): Observable<any> {
    return this.http.post<any>(this.urlSoftPcApi, JSON.stringify(software), this.httpOptions);
  }

  modificaSoftwarePC(nsoftware: number, software: SoftwarePC): Observable<any> {
    return this.http.put<any>(`${this.urlSoftPcApi}?id=${nsoftware}`, JSON.stringify(software), this.httpOptions);
  }

  borraSoftwarePC(nsoftware: number): Observable<any> {
    return this.http.delete(`${this.urlSoftPcApi}?id=${nsoftware}`);
  }
}
