import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { SoftwareService } from '../../software.service';
import { SoftwarePC } from '../../softwarePC';
import { Ordenadores } from '../../ordenadores';
import { Software } from '../../software';

@Component({
  selector: 'app-software-pc',
  templateUrl: './software-pc.component.html',
  styleUrl: './software-pc.component.css'
})
export class SoftwarePCComponent {
  @ViewChild('softPcForm', { static: true }) softPcForm: NgForm | undefined;

  public softwareAct : Software = {
    id : 0,
    nombre : ''
  }

  public softwarePcAct : SoftwarePC = {
    id: 0,
    idPC: 0,
    idSoftware: 0,
    fecha: '',
    softnombre: '',
    pcnombre: ''
  }

  public ordenadorAct : Ordenadores = {
    id: 0,
    numero: '',
    idMarca: 0,
    modelo: '',
    idUbicacion: 0,
    nombre: '',
    tipo: '',
    numeroSerie: '',
    Red: '',
    MACLAN: '',
    IPLAN: '',
    MACWIFI: '',
    IPWIFI: '',
    HD1: '',
    HD2: '',
    Observaciones: '',
    precio: 0
  }

  public software : Software[] = [];
  public ordenadores : Ordenadores[] = [];
  public titulo: string = 'Asignar PC';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _softwareService: SoftwareService, private _route: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.traerOrdenadores();
    this.traerSoftwares();
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

  private traeSoftPC(id: number) {
    this._softwareService.obtengoSoftwarePcID(id).subscribe({
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

  private traerSoftwares() {
    this._softwareService.obtengoTodoSoftware().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.software = resultado;
        } else {
          this.toastr.error('Error al obtener el software:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener el software:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }



  private traerOrdenadores() {
    this._softwareService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ordenadores = resultado;
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
      // console.log('Formulario válido:', this.dispoRedForm?.valid);
      // console.log('Datos del dispositivo:', this.dispoRedAct);
      if (this.tipo == 0) {
        this._softwareService.guardaSoftwarePC(this.softwarePcAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Software asignado');
              this._route.navigate(['/software']);
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
        this._softwareService.modificaSoftwarePC(this.id, this.softwarePcAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              console.log(resultado);
              console.log(this.softwarePcAct);
              this.toastr.success('Asignacion modificada');
              this._route.navigate(['/software']);
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
        this._softwareService.borraSoftwarePC(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Asignacion eliminada');
              this._route.navigate(['/software']);
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
    this._route.navigate(['/software'], { queryParams: {} });
  }

  //Funcion para poder realizar validaciones en los formularios de forma visual
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

}
