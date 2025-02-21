import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Periferico } from './perifericos';
import { Marca } from '../marca/marca';



@Injectable({
  providedIn: 'root'
})
export class PeriService {
  // URL del API donde se encuentran los usuarios.  (https://uat-inventarios.proyectos-2daw.es/api/usuControl.php)

  urlApi = 'https://uat-inventarios.proyectos-2daw.es/api/perifeControl.php';
  urlMarcas = 'https://uat-inventarios.proyectos-2daw.es/api/marcaControl.php';
  urlOrdenadores = 'https://uat-inventarios.proyectos-2daw.es/api/ordeControl.php';
  urlUBI='https://uat-inventarios.proyectos-2daw.es/api/ubiControl.php';
  // Cabeceras HTTP para el uso del API.  (Content-Type: application/json)
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Constructor del Servicio de Usuario.  (HttpClient para hacer las peticiones HTTP)  (Inyectamos HttpClient en el constructor para poder usarlo.)
  constructor(private http: HttpClient) { }

  //Funcion para quitar el "user" que viene en la respuesta del API y devolver solo el objeto User.
  // removeUserWrapper<T>(jsonResponse: { user: T } | T): T {
  //   return (jsonResponse as any).user ? (jsonResponse as any).user : jsonResponse;
  // }
  obtengoMarcas(): Observable<any>{
    return this.http.get(`${this.urlMarcas}`);
  }
  obtengoUbicaciones(): Observable<any>{
    return this.http.get(`${this.urlUBI}`);
  }
  obtengoOrdenadores(): Observable<any>{
    return this.http.get(`${this.urlOrdenadores}`);

  }
  // Funcion para obtener todos los usuarios.
  obtengoAllPeriAPI(): Observable<any> {
    return this.http.get(`${this.urlApi}`);
  }

  // Funcion para obtener un usuario por su id.  (nuser: number) es el id del usuario.
  obtengoPeriAPI(nuser: number): Observable<any> {
    return this.http.get(`${this.urlApi}?id=${nuser}`);
  }

  // Funcion para crear un nuevo usuario. (user: User) es el objeto User con los datos del nuevo usuario.
  crearPeriAPI(per: Periferico): Observable<any> {

    return this.http.post<any>(this.urlApi, JSON.stringify(per), this.httpOptions);
  }

  // Funcion para modificar un usuario. (nuser: number, user: User) es el id del usuario y el objeto User con los nuevos datos del usuario.  (removeUserWrapper es una función que se encarga de quitar el "user" que viene en la respuesta del API y devolver solo el objeto User.)  (JSON.stringify convierte un objeto a una cadena de texto)  (this.httpOptions es las cabec
  modificaPeriAPI(nper: number, per: Periferico): Observable<any> {

    return this.http.put<any>(`${this.urlApi}?id=${nper}`, JSON.stringify(per), this.httpOptions);
  }


  //Modifica registros de los ordenadores en la api
  modificaPerifericoUbicacion(nper:number, UbicacionId:number): Observable<any> {
    const body = { idUbicacion: UbicacionId };

    return this.http.patch<any>(`${this.urlApi}/?id=${nper}`, JSON.stringify(body), this.httpOptions);
  }

  // Funcion para borrar un usuario. (nuser: number) es el id del usuario.
  borraPeriAPI(nper: number): Observable<any> {

    return this.http.delete(`${this.urlApi}?id=${nper}`);
  }

}
