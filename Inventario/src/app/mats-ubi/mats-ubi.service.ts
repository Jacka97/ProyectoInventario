import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOUbi } from './ubisO&N';

export class MatsUbiService {
  urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/ubiMatsControl.php';
  urlUBI='https://uat-inventarios.proyectos-2daw.es/api/ubiControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  
  getUbicacionesIdUbicaion(idUbicacion: number) {
    return this.http.get(`${this.urlAPI}?idUbicacion=${idUbicacion}`);
  }
  modAllUbis(ubis: NOUbi) {
    return this.http.post(`${this.urlAPI}` ,JSON.stringify(ubis),  this.httpOptions);
  } 
  getAllUbis(){
    return this.http.get(`${this.urlUBI}`);
  }
  
}
