import { Component } from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventario';

  constructor(private _loginService: LoginService) { }
  estaIdentificado(): boolean {
    return this._loginService.estaIdentificado();
  }
}
