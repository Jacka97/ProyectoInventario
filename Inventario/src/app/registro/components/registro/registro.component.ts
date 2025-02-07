import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailValidator } from '../../../validadores';
import { ToastrService } from 'ngx-toastr';
import { registroService } from '../../registro.service';
import { User } from '../../../users/Users';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../../users/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  urlApi = 'https://uat-inventarios.proyectos-2daw.es/api/usuControl.php';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  public useract: User = {correo: '', pass: '', nombre: '', activo: 0, id_rol: 2,};
  registroForm:any = FormGroup;
  nombreControl:any = FormControl;
  emailControl:any = FormControl;
  contrasenyaControl:any = FormControl;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private _registroService: registroService, private http: HttpClient, private _usersService: UserService, private _route: Router) {}

  ngOnInit(): void {
    this.nombreControl = new FormControl('', [Validators.required]);
    this.emailControl = new FormControl('', [Validators.required, emailValidator()]);
    this.contrasenyaControl = new FormControl('', [Validators.required, Validators.pattern('^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')])
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, emailValidator()]],
      contrasenya: ['', Validators.pattern('^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')]
    })
  }

  enviarFormulario(): void {
    this._usersService.crearUserApi(this.useract).subscribe({
      next: (resultado) => {
        if (resultado) {
          console.log("Usuario creado:", resultado);
          this._route.navigate(["/login"]); // Redirección corregida
        } else {
          this.toastr.error("Error al crear el usuario:", resultado);
        }
      },
      error: (error) => {
        this.toastr.error("Error al crear el usuario:", error.error?.errores || error);
      },
      complete: () => {
        console.log("Operación completada.");
      },
    });
  }
  

  removeUserWrapper<T>(jsonResponse: { user: T } | T): T {
    return (jsonResponse as any).user ? (jsonResponse as any).user : jsonResponse;
  }

  crearUserApi(user: User): Observable<any> {
    const cleanUser = this.removeUserWrapper(user); // Quitar "user"
    console.log(cleanUser);
    return this.http.post<any>(this.urlApi, JSON.stringify(cleanUser), this.httpOptions);
  }
}
