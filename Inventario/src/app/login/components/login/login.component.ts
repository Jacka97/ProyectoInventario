import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../validadores';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  constructor(private _loginService: LoginService, private _route:Router, private _fb: FormBuilder) { 
    this.loginForm = this._fb.group({
      email: ['', [Validators.required], [emailValidator()]],
      contrasenya: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  compruebaUsuario(): void {
    if (this._loginService.compruebaUsuario(this.loginForm.get('email')?.value, this.loginForm.get('contrasenya')?.value)) {
      console.log('Usuario identificado');
      this._route.navigate(['/bienvenida']);
    } else {
      this.loginForm.setValue({
        email: '',
        contrasenya: '',
        });
    }
  }

  get email() {
    return this.loginForm.get('email');
    }
}
