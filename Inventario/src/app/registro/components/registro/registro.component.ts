import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailValidator } from '../../../validadores';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  registroForm:any = FormGroup;
  nombreControl:any = FormGroup;
  emailControl:any = FormGroup;
  contrasenyaControl:any = FormGroup;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {}

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
    if (this.registroForm.valid) {
      const datosFormulario = {
        nombre: this.nombreControl.value,
        email: this.emailControl.value,
        contrasenya: this.contrasenyaControl.value
      };
      console.log(datosFormulario);
    } else {
      this.toastr.error("Datos introducidos no validos", 'Error de validacion');
      this.registroForm.setValue({
        nombre: '',
        email: '',
        contrasenya: ''
      })
    }
  }
}
