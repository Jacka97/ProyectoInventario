import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NOUbi } from './ubisO&N';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatsUbiService {
  private urlAPI = 'https://inventarios.proyectos-2daw.es/api/ubiMatsControl.php';
  private urlUBI = 'https://inventarios.proyectos-2daw.es/api/ubiControl.php';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // 🔹 Obtiene los materiales de una ubicación por ID
  getMaterialesPorUbicacion(idUbicacion: number): Observable<any> {
    return this.http.get<any>(`${this.urlAPI}?idUbicacion=${idUbicacion}`);
  }
  

  // 🔹 Modifica la ubicación de todos los materiales en una ubicación
  updateUbicacionMateriales(ubis: NOUbi): Observable<any> {
    return this.http.put<any>(this.urlAPI, JSON.stringify(ubis), this.httpOptions);
  }

  // 🔹 Obtiene todas las ubicaciones disponibles
  getAllUbis(): Observable<any> {
    return this.http.get<any>(this.urlUBI);
  }
}
