import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor() { }
  private email: string = 'admin@admin.com';
  private contrasenya: string = 'admin';
  private identificado: boolean = false;
  estaIdentificado(): boolean {
    return this.identificado;
  }
  compruebaUsuario(email: string, contrasenya: string): boolean {
    this.identificado = email == this.email && contrasenya == this.contrasenya;
    return this.identificado;
  }
}
