import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  standalone: false,

  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  constructor(private _loginService: LoginService, private _route: Router) { }
  // ngOnInit() {
  //   this._loginService.salirAplicacion();
  // }
  
  volverAentrar() {
    this._route.navigate(['/login']);
  }
}