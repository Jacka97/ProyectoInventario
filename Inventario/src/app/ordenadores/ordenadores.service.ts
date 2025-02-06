import { Injectable } from '@angular/core';
import { Ordenadores } from './ordenadores';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable ({
    providedIn : 'root'
})

export class OrdenadoresService {
    urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'applicantion/json'
        })
    }

    constructor(private http: HttpClient) {}
    private ordenadores: Ordenadores[] = [];

    obtengoOrdenadores(): Observable<any> {
        return this.http.get(`${this.urlAPI}`);
      }

    obtengoOrdenadoresArr() : Ordenadores[] {
        return this.ordenadores;
    }
    //   guardaNuevoEmpleadoPhp( ordenadores:Ordenadores): Observable<any> {
    //     return this.http.post<any>(`${this.urlAPI}/alta.php`, JSON.stringify(ordenadores));
    //   }
    //   modificaEmpleadoPhp(nempleado:number, empleado:Empleado): Observable<any>{
    //     return this.http.post<any>(`${this.urlPhp}/modificacion.php`, {'id':nempleado,'nombre':empleado.nombre, 'edad':empleado.edad, 'cargo':empleado.cargo, 'contratado': empleado.contratado});
    //   }
    //   obtengoEmpleadoPhp(nempleado:number):Observable<any> {
    //     return this.http.get(`${this.urlPhp}seleccionar.php?id=${nempleado}`);
    //   }
    //   borraEmpleadoPhp(nempleado:number): Observable<any>{
    //     return this.http.get(`${this.urlPhp}baja.php?id=${nempleado}`);
    //   }
}