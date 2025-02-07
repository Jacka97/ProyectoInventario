import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Users';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlApi = 'https://uat-inventarios.proyectos-2daw.es/api/usuControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }
  removeUserWrapper<T>(jsonResponse: { user: T } | T): T {
    return (jsonResponse as any).user ? (jsonResponse as any).user : jsonResponse;
  }
  
  obtengoAllUsersApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }
  obtengoUserApi(nuser: number): Observable<any> {
    return this.http.get(`${this.urlApi}?id=${nuser}`);
  }
  crearUserApi(user: User): Observable<any> {
    const cleanUser = this.removeUserWrapper(user); // Quitar "user"
    console.log(cleanUser);
    return this.http.post<any>(this.urlApi, JSON.stringify(cleanUser), this.httpOptions);
  }
  
  modificaUserApi(nuser: number, user: User): Observable<any> {
    const cleanUser = this.removeUserWrapper(user); 
    
    console.log(cleanUser);
    return this.http.put<any>(`${this.urlApi}?id=${nuser}`, JSON.stringify(cleanUser), this.httpOptions);
  }
  
  borraUserApi(nuser: number): Observable<any> {
    console.log(nuser);
    return this.http.delete(`${this.urlApi}?id=${nuser}`);
  }

}
