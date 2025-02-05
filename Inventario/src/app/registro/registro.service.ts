import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable ({
    providedIn: 'root'
})

export class registroService {
    constructor() {}

    registro(userData:any) : Observable<any> {
        console.log('Registrado: ', userData);
        return of ({success: true, message: 'Usuario registrado satisfactoriamente'})
    }
}