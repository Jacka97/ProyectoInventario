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
  correo: string = '';
  pass: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  rol: number = 0;
  //Funcion que corrobora que estas identificado, como esta creado en el service lo traes aqui para que pueda ser llamado desde el html de este component.
 
  

  //Valida los campos del formulario
  public loginForm: FormGroup;
  constructor(private _loginService: LoginService, private _route:Router, private _fb: FormBuilder, private toastr: ToastrService) { 
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, emailValidator()]],
      contrasenya: ['', [Validators.required, Validators.minLength(3)]]
      });
  }

  ngOnInit(): void {
    this.loginForm.get('email')?.valueChanges.subscribe(notif => this.updateNotifMethod(notif));

    this.redirige();
  }
  estaIdentificado(): boolean {
    return this._loginService.estaIdentificado();
  }
  //Si el usuario borra la ruta de la app, te redirige por defecto a la pagina principal
  redirige(): any {
    if(this.estaIdentificado()){
      return this._route.navigate(['/bienvenido']);
    }
  }

  //Comprobacion de que los datos que llegan del formulario coinciden con los que se traen de la api donde estan los usuarios registrados en la BBDD
  compruebaUsuario(): void {
    if (this.loginForm.valid) {
      this._loginService.login(this.loginForm.get('email')?.value, this.loginForm.get('contrasenya')?.value).subscribe({
        next: (resultado) => {
          if(resultado.success){
            this._loginService.saveToken(resultado.token);
            sessionStorage.setItem('userRole', resultado.Rol.toString());
            this.toastr.success('Usuario autentificado correctamente', 'Bienvenido',  {positionClass: 'toast-bottom-right'});
            this._route.navigate(['/bienvenido']);
          }else{
            this.toastr.error(resultado.message);
            this.loginForm.setValue({
              usuario: '',
              contrasenya: '',
            });
          }

        },
        error: (error) => {
          this.toastr.error("Datos introducidos no válidos", 'Error de validación');
          this.loginForm.setValue({
            usuario: '',
            contrasenya: '',
          });
        },
        complete: () => {
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
  }
}
