import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-encabezado',
  standalone: false,
  
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
  

  constructor(private _loginService: LoginService) {}

  get userRole(): number {
    return this._loginService.getUserRole();
  }

  // Verificar si el usuario es administrador (rol = 1)
  isAdmin(): boolean {
    return this.userRole == 1;
  }
  isTecnico(): boolean { // Para el sprint 3
    return this.userRole == 3;
  }


  @Input() titulo: string="";
  
}
