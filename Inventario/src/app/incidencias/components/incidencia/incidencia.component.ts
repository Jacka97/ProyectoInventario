import { Component, ViewChild } from '@angular/core';
import { Incidencia } from '../../incidencia';
import { IncidenciaService } from '../../incidencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { Ubicacion } from '../../../ubicaciones/ubicacion';
import { LoginService } from '../../../login/login.service';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrl: './incidencia.component.css'
})
export class IncidenciaComponent {
 @ViewChild('incidenciaForm', { static: true }) incidenciaForm: NgForm | undefined;
 constructor(private _incidenciasService: IncidenciaService, private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService,private _loginService: LoginService) { }
 public emailUsuario:string= this._loginService.getemailRole();
  public ubiact: Ubicacion = {id: 0, nombre: ''};
  public ubis: Ubicacion[] = [];
  public incidenciaAct: Incidencia = {
    id: 0,
    idTecnico: 0,
    nombreUbicacion: '',
    asunto: '',
    descripcion: '',
    estado: '',
    fechaCreacion: '',
    fechaCierre: '',
    idUbicacion: 0,
    emailUsuario: this.emailUsuario
  };

  //Variables que cambiaran en funcion de las acciones que hagamos en los formularios y en la tabla
  public titulo: string = 'Alta de una nueva incidencia';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;



  //Distigue que tipo de accion vamos a realizar dentro de la lista
  ngOnInit() {
    this.traerUbis();
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];

    if (this.tipo == 1) {
      this.titulo = 'Modificar datos de la incidencia (' + this.id + ')';
      this.traeIncidencia(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar una incidencia (' + this.id + ')';
      this.txtBtn = 'Borrar';
      this.traeIncidencia(this.id);
    }
  }

  //Traigo el listado de las ubicaciones
  private traerUbis(){
    this._incidenciasService.obtengoUbicaciones().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ubis = resultado;
        } else {
          this.toastr.error('Error al obtener los roles:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener los roles:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  //Se cotejan los resultados obtenidos de la api y se agrega el ordenador al listado
  guardaIncidencia(): void {
    console.log('Formulario válido:', this.incidenciaForm?.valid);
    console.log('Datos del ordenador:', this.incidenciaAct);
    if (this.incidenciaForm!.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      console.log(JSON.stringify(this.incidenciaAct));
      if (this.tipo == 0) {
        this._incidenciasService.guardaNuevaIncidencia(this.incidenciaAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Incidencia Agregada');
              this._route.navigate(['/incidencia']);
            } else {
              this.toastr.error('Error al agregar la incidencia');
            }
          },
          error: (error) => {
            this.toastr.error('Error al agregar la incidencia: ', error);
          },
          complete: () => {
            this.toastr.success('Operacion completada');
          },
        });
      } else if (this.tipo == 1) {
        this._incidenciasService.modificaIncidencia(this.id, this.incidenciaAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              console.log(resultado);
              console.log(this.incidenciaAct);
              this.toastr.success('Datos modificados');
              this._route.navigate(['/incidencia']);
            } else {
              this.toastr.error('Error al modificar la incidencia');
            }
          },
          error: (error) => {
            this.toastr.error('Error al modificar la incidencia: ', error);
          },
          complete: () => {
            this.toastr.success('Modificacion completada');
          },
        });
      } else if (this.tipo == 2) {
        this._incidenciasService.borraIncidencia(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Incidencia eliminada');
              this._route.navigate(['/incidencia']);
            } else {
              this.toastr.error('Error al eliminar la incidencia');
            }
          },
          error: (error) => {
            this.toastr.error('Error al eliminar la incidencia:', error);
          },
          complete: () => {
            this.toastr.success('Borrado realizado');
          },
        });
      }
    } else {
      this.toastr.error('El formulario tiene campos invalidos');
    }

  }

  //Funcion en la que le entra el id del ordenador por parametro y trae el ordenador correspondiente a la funcion que sea (modificar,borrar)
  private traeIncidencia(id: number) {
    this._incidenciasService.obtengoIncidencia(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.incidenciaAct = resultado;
          console.log(resultado);
        } else {
          this.toastr.error(resultado, 'Error obteniendo la incidencia');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la incidencia')
      },
      complete: () => {
        console.log('Operacion completada');
      },
    });
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

