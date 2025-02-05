import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { emailValidator } from '../../../validadores';

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

  
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {

    this.nombreControl = new FormControl('', [Validators.required]);
    this.emailControl = new FormControl('', [Validators.required, emailValidator()])
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, emailValidator()]],
      contrasenya: ['', Validators.pattern('^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$')]
    })
  }
}
