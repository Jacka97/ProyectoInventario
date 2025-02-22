import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Software } from '../software/software';
import { Ordenadores } from './ordenadores';
import { SoftwarePC } from './softwarePC';

@Injectable({
    providedIn: 'root'
  })

export class SoftwarePcService {
    //Variables con los links a las apis pertinentes
    urlOrdenadores = 'https://inventarios.proyectos-2daw.es/api/ordeControl.php';
    urlSoftwareApi = 'https://inventarios.proyectos-2daw.es/api/softwControl.php';
    urlSoftwarePcApi = 'https://inventarios.proyectos-2daw.es/api/softPcControl.php';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'applicantion/json'
        })
    }

    constructor (private http : HttpClient) {}

    //Funciones para llamar a las diferentes funcionalidades de las api y para los objetos que necesito
    obtengoOrdenadores(): Observable<any>{
        return this.http.get(`${this.urlOrdenadores}`);
    }

    // obtengoUbicacionesApi(): Observable<any> {
    //     return this.http.get(`${this.urlUbicaciones}`);
    // }

    obtengoTodoSoftware(): Observable<any> {
        return this.http.get(`${this.urlSoftwareApi}`);
    }

    obtengoSoftwarePcID(nsoftware: number): Observable<any> {
        return this.http.get(`${this.urlSoftwarePcApi}?id=${nsoftware}`);
    }

    obtengoTodoSoftwarePc(): Observable<any> {
        return this.http.get(`${this.urlSoftwarePcApi}`);
    }

    obtengoSoftwareID(nsoftware: number): Observable<any> {
        return this.http.get(`${this.urlSoftwareApi}?id=${nsoftware}`);
    }

    guardaSoftwarePC(softwarePc: SoftwarePC): Observable<any> {
        let objeto = JSON.stringify(softwarePc);

        let variable = this.http.post<any>(this.urlSoftwarePcApi, JSON.stringify(softwarePc), this.httpOptions);
        console.log("variable = "+variable);
        console.log("objeto = "+objeto);

        return variable;
    }

    modificaSoftwarePC(nsoftware: number, softwarepc: SoftwarePC): Observable<any> {
        return this.http.put<any>(`${this.urlSoftwarePcApi}?id=${nsoftware}`, JSON.stringify(softwarepc), this.httpOptions);
    }

    borraSoftwarePC(nsoftware: number): Observable<any> {
        return this.http.delete(`${this.urlSoftwarePcApi}?id=${nsoftware}`);
    }
}