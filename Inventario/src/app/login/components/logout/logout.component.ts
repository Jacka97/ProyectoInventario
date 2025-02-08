import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
@Component({
  selector: 'app-logout',
  standalone: false,

  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private _loginService: LoginService, private _route: Router, private toastr: ToastrService, private location: Location) { }

  cancelar() {
    this.location.back();
  }
  
  volverAentrar() {
    this._loginService.salirAplicacion();
    this._route.navigate(['/login']);
    this.toastr.success('Sesión abandonada', 'Hasta pronto', {positionClass: 'toast-bottom-right'});
  }
}