import { Component, ViewChild } from '@angular/core';
import { Ordenadores } from '../../ordenadores';
import { OrdenadoresService } from '../../ordenadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrl: './ordenadores.component.css'
})
export class OrdenadoresComponent {
  @ViewChild ('ordenadorForm', { static: true }) ordenadorForm: NgForm | undefined;
  public ordenadorAct: Ordenadores = { 
    id: 0, 
    numero: '', 
    idMarca: 0, 
    modelo: '', 
    idUbicacion: 0, 
    nombre: '', 
    tipo: '', 
    numeroSerie: '', 
    red: '', 
    macLAN: '', 
    macWifi: '', 
    ipWifi: '', 
    hd1: '', 
    hd2: '', 
    observaciones: '' 
  };
  public titulo: string = 'Alta de un nuevo ordenador';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;

  constructor(private _ordenadoresService: OrdenadoresService, private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];

    if (this.tipo == 1) {
      this.titulo = 'Modificar datos del ordenador (' + this.id + ')';
      this.traeOrdenador(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar un ordenador (' + this.id + ')';
      this.txtBtn = 'Borrar';
      this.traeOrdenador(this.id);
    }
  }

  guardaOrdenador(): void {
    if (this.ordenadorForm!.valid || this.tipo == 2) {
      this.formularioCambiado = false;
    }

    if (this.tipo == 0) {
      this._ordenadoresService.guardaNuevoOrdenador(this.ordenadorAct).subscribe({
        next: (resultado) => {
          if (resultado) {
            console.log('Ordenador Agregado', resultado);
            this._route.navigate(['/ordenadores']);
          } else {
            this.toastr.error('Error al agregar el ordenador: ', resultado);
          }
        },
        error: (error) => {
          this.toastr.error('Error al agregar el ordenador: ', error);
        },
        complete: () => {
          console.log('Operacion completada');
        },
      });
    } else if (this.tipo == 1) {
      this._ordenadoresService.modificaOrdenador(this.id, this.ordenadorAct).subscribe({
        next: (resultado) => {
          if (resultado) {
            console.log('Datos modificados', resultado);
            this._route.navigate(['/ordenadores']);
          } else {
            this.toastr.error('Error al modificar el ordenador: ', resultado);
          }
        },
        error: (error) => {
          this.toastr.error('Error al modificar el ordenador: ', error);
        },
        complete: () => {
          console.log('Modificacion completada');
        },
      });
    } else if (this.tipo == 2){
      this._ordenadoresService.borraOrdenador(this.id).subscribe({
        next: (resultado) => {
          if (resultado) {
            console.log('Ordenador eliminado: ', resultado);
            this._route.navigate(['/ordenadores']);
          } else {
            this.toastr.error('Error al eliminar el ordenador: ', resultado);
          }
        },
        error: (error) => {
          this.toastr.error('Error al eliminar el ordenador:', error);
        },
        complete: () => {
          console.log('Borrado realizado');
        },
      });
    }
  }

  private traeOrdenador(id:number) {
    this._ordenadoresService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado == "OK") {
          this.ordenadorAct = resultado;
        } else {
          this.toastr.error(resultado, 'Error al obtener el ordenador');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el ordenador')
      },
      complete: () => {
        console.log('Operacion completada');
      },
    });
  }

  cambiado(): void {
    this.formularioCambiado = true;
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
