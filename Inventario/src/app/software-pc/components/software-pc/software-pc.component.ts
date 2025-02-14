import { Component,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { SoftwarePcService } from '../../software-pc.service'
import { OrdenadoresService } from '../../../ordenadores/ordenadores.service';

@Component({
  selector: 'app-software-pc',
  templateUrl: './software-pc.component.html',
  styleUrl: './software-pc.component.css'
})
export class SoftwarePcComponent {
  @ViewChild('softPcForm', { static: true }) softPcForm: NgForm | undefined;

  softwarePcAct: any;
  ordenadoresAct: any;

  public titulo: string = 'Asignar PC';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _softwarePcService : SoftwarePcService, private _ordenadoresService : OrdenadoresService, private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService){
    this.ordenadoresAct = [];
  }

  ngOnInit() {
    this.traerOrdenadores();
    this.traeTodosSoftPC();
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Asignacion (' + this.id + ')';
      this.traeSoftPC(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Asignacion (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeSoftPC(this.id);
    }
  }

  private traeTodosSoftPC() {
    this._softwarePcService.obtengoSoftwarePC().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.softwarePcAct = resultado;
        } else {
          this.toastr.error('Error al obtener la asignacion:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener la asignacion:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  private traeSoftPC(id: number) {
    this._softwarePcService.obtengoSoftwarePcID(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.softwarePcAct = resultado;
        } else {
          this.toastr.error('Error al obtener la asignacion:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener la asignacion:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  private traerOrdenadores() {
    this._softwarePcService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ordenadoresAct = resultado;
        } else {
          this.toastr.error('Error al obtener el ordenador:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener el ordenador:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  guardaSoftwarePC(): void {
    if (this.softPcForm?.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._softwarePcService.guardaSoftwarePC(this.softwarePcAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Software asignado');
              this._route.navigate(['/software-pc']);
            } else {
              this.toastr.error('Error al asignar');
            }
          },
          error: (error) => {
            this.toastr.error('Error al asignar: ', error);
          },
          complete: () => {
            this.toastr.success('Operacion completada');
          },
        });
      } else if (this.tipo == 1) {
        console.log(this.softwarePcAct);
        this._softwarePcService.modificaSoftwarePC(this.id, this.softwarePcAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              console.log(resultado);
              console.log(this.softwarePcAct);
              this.toastr.success('Asignacion modificada');
              this._route.navigate(['/software-pc']);
            } else {
              this.toastr.error('Error al modificar la asignacion');
            }
          },
          error: (error) => {
            this.toastr.error('Error al modificar la asignacion: ', error);
          },
          complete: () => {
            this.toastr.success('Modificacion completada');
          },
        });
      } else if (this.tipo == 2) {
        this._softwarePcService.borraSoftwarePC(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Asignacion eliminada');
              this._route.navigate(['/software-pc']);
            } else {
              this.toastr.error('Error al eliminar la asignacion');
            }
          },
          error: (error) => {
            this.toastr.error('Error al eliminar la asignacion:', error);
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

  cambiado(): void {
    this.formularioCambiado = true;
  }

  cancelar(event : Event) : void {
    event.preventDefault();
    this._route.navigate(['/software-pc'], { queryParams: {} });
  }

  //Funcion para poder realizar validaciones en los formularios de forma visual
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
