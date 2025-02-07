import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "../users/Users";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable ({
    providedIn: 'root'
})

export class registroService {
    
    urlApi = 'https://uat-inventarios.proyectos-2daw.es/api/usuControl.php';
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    constructor(private http: HttpClient) { }

    registro(userData:any) : Observable<any> {
        console.log('Registrado: ', userData);
        return of ({success: true, message: 'Usuario registrado satisfactoriamente'})
    }

    removeUserWrapper<T>(jsonResponse: { user: T } | T): T {
        return (jsonResponse as any).user ? (jsonResponse as any).user : jsonResponse;
    }

      crearUserApi(user: User): Observable<any> {
        const cleanUser = this.removeUserWrapper(user); // Quitar "user"
        console.log(cleanUser);
        return this.http.post<any>(this.urlApi, JSON.stringify(cleanUser), this.httpOptions);
      }
}