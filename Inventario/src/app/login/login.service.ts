import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlAPI = 'https://uat-inventarios.proyectos-2daw.es/api/usuControl.php';
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable <any> {
    return this.http.post<any>(`${this.urlAPI}/login`, {email, password});
  }

  getToken():string | null {
    return localStorage.getItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token); // Guarda el token
  }

  estaIdentificado(): boolean {
    return this.getToken() !== null; // Verifica si el token existe
  }

  salirAplicacion(): void {
    localStorage.removeItem('token'); // Elimina el token
  }
  
}
