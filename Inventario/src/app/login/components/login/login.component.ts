import { Component } from '@angular/core';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../../validadores';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  constructor(private _loginService: LoginService, private _route:Router, private _fb: FormBuilder, private toastr: ToastrService) { 
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, emailValidator()]],
      contrasenya: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  ngOnInit(): void {
    this.loginForm.get('email')?.valueChanges.subscribe(notif => this.updateNotifMethod(notif));
  }

  compruebaUsuario(): void {
    if (this.loginForm.valid) {
      this._loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('contrasenya')?.value).subscribe({
        next: (resultado) => {
          this._loginService.saveToken(resultado.token);
          this.toastr.success('Usuario autentificado correctamente', 'Usuario autentificado',  {positionClass: 'toast-bottom-right'});
          this._route.navigate(['/bienvenido']);
        },
        error: (error) => {
          console.error('Error al hacer el login:', error);
          this.toastr.error("Datos introducidos no válidos", 'Error de validación');
          this.loginForm.setValue({
            usuario: '',
            contrasenya: '',
          });
        },
        complete: () => {
          console.log('Operación completada.');
        },
      });
    } else {
      this.toastr.error("Datos introducidos no válidos", 'Error de validación');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  updateNotifMethod(notif: any) {
    // console.log(notif);
  }
}
