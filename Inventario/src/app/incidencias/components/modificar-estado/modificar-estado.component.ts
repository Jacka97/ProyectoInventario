import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { IncidenciaService } from '../../incidencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../login/login.service';


@Component({
  selector: 'app-modificar-estado',
  templateUrl: './modificar-estado.component.html',
  styleUrl: './modificar-estado.component.css'
})
export class ModificarEstadoComponent {
 @ViewChild('incidenciaForm', { static: true }) incidenciaForm: NgForm | undefined;
 constructor(private _incidenciasService: IncidenciaService, private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService,private _loginService: LoginService) { }


  //Variables que cambiaran en funcion de las acciones que hagamos en los formularios y en la tabla
  public titulo: string = 'Modificar el estado de la incidencia';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;
  public estado:string='';
  public comentarioTecnico='';
  public emailUser:string= this._loginService.getemailRole();



  //Distigue que tipo de accion vamos a realizar dentro de la lista
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];
  }


  //Se cotejan los resultados obtenidos de la api y se agrega el ordenador al listado
  modificarEstado(): void {

    if (this.incidenciaForm!.valid) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._incidenciasService.modificaIncidenciaEstado(this.id,this.estado,this.comentarioTecnico).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Estado modificado');
              this._route.navigate(['/incidencia']);
            } else {
              this.toastr.error('Error al modificar la incidencia');
            }
          },
          error: (error) => {
            this.toastr.error('Error al modificar la incidencia: ', error);
          },
          complete: () => {
            this.toastr.success('Operacion completada');
          },
        });
      } else {
      this.toastr.error('El formulario tiene campos invalidos');
    }

  }
}



    //Evitamos enviar datos del formulario en la url cuando cancelamos
    cancelar(event : Event) : void {
      event.preventDefault();
      this._route.navigate(['/incidencia'], { queryParams: {} });
    }

  cambiado(): void {
    this.formularioCambiado = true;
  }

  //Funcion para poder realizar validaciones en los formularios de forma visual
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}

