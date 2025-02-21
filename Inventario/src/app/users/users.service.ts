import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Users';
import { Rol } from './Roles';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  // URL del API donde se encuentran los usuarios.  (https://uat-inventarios.proyectos-2daw.es/api/usuControl.php)
  urlROL = 'https://inventarios.proyectos-2daw.es/api/rolControl.php';
  urlApi = 'https://inventarios.proyectos-2daw.es/api/usuControl.php';
  // Cabeceras HTTP para el uso del API.  (Content-Type: application/json)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Constructor del Servicio de Usuario.  (HttpClient para hacer las peticiones HTTP)  (Inyectamos HttpClient en el constructor para poder usarlo.)
  constructor(private http: HttpClient) { }

  //Funcion para quitar el "user" que viene en la respuesta del API y devolver solo el objeto User.
  removeUserWrapper<T>(jsonResponse: { user: T } | T): T {
    return (jsonResponse as any).user ? (jsonResponse as any).user : jsonResponse;
  }
  
  // Funcion para obtener todos los usuarios.
  obtengoAllUsersApi(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }
  
  // Funcion para obtener todos los roles.
  obtengoAllRolesApi(): Observable<any> {
    return this.http.get(`${this.urlROL}`);
  }
  
  // Funcion para obtener un usuario por su id.  (nuser: number) es el id del usuario.
  obtengoUserApi(nuser: number): Observable<any> {
    return this.http.get(`${this.urlApi}?id=${nuser}`);
  }
  
  // Funcion para crear un nuevo usuario. (user: User) es el objeto User con los datos del nuevo usuario.
  crearUserApi(user: User): Observable<any> {
    const cleanUser = this.removeUserWrapper(user); // Quitar "user"
    console.log(cleanUser);
    return this.http.post<any>(this.urlApi, JSON.stringify(cleanUser), this.httpOptions);
  }
  
  // Funcion para modificar un usuario. (nuser: number, user: User) es el id del usuario y el objeto User con los nuevos datos del usuario.  (removeUserWrapper es una función que se encarga de quitar el "user" que viene en la respuesta del API y devolver solo el objeto User.)  (JSON.stringify convierte un objeto a una cadena de texto)  (this.httpOptions es las cabec
  modificaUserApi(nuser: number, user: User): Observable<any> {
    const cleanUser = this.removeUserWrapper(user); 
    
    console.log(cleanUser);
    return this.http.put<any>(`${this.urlApi}?id=${nuser}`, JSON.stringify(cleanUser), this.httpOptions);
  }
  
  // Funcion para borrar un usuario. (nuser: number) es el id del usuario.
  borraUserApi(nuser: number): Observable<any> {
    console.log(nuser);
    return this.http.delete(`${this.urlApi}?id=${nuser}`);
  }

}
