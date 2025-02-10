import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/login.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  //Nos traemos los datos de los usuarios almacenados en la BBDD
  login(correo: string, pass: string): Observable<any> {
    const body = { correo, pass };
    return this.http.post<any>(`${this.urlAPI}`, JSON.stringify(body), this.httpOptions);
  }

  getToken():string | null {
    return sessionStorage.getItem('token');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('token', token); // Guarda el token
  }

  estaIdentificado(): boolean {
    return this.getToken() !== null; // Verifica si el token existe
  }

  salirAplicacion(): void {
    sessionStorage.removeItem('token'); // Elimina el token
  }
  
}
