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

  saveRole(rol: number): void {
    sessionStorage.setItem('userRole', rol.toString()); // Guarda el rol
  }
  getUserRole(): number {
    const role = sessionStorage.getItem('userRole');
    return role ? +role : 0; // Devuelve el rol como número o 0 si no existe
  }
  saveToken(token: string): void {
    sessionStorage.setItem('token', token); // Guarda el token
  }

  saveEmail(correo:string): void {
    sessionStorage.setItem('correo', correo); // Guarda el rol
  }
  getemailRole(): string {
    return sessionStorage.getItem('correo') ?? '';
}
  estaIdentificado(): boolean {
    return this.getToken() !== null; // Verifica si el token existe
  }

  salirAplicacion(): void {
    sessionStorage.removeItem('token'); // Elimina el token
    sessionStorage.removeItem('userRole'); // Elimina el rol
    sessionStorage.removeItem('correo'); // Elimina el rol
  }


}
