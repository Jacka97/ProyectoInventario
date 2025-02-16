import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { SoftwareService } from '../../software.service';
import { Software } from '../../software';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrl: './software.component.css'
})
export class SoftwareComponent {
  @ViewChild('softwareForm', { static: true }) softwareForm: NgForm | undefined;

  public softwareAct: Software = {
    id: 0,
    nombre: ''
  }

  public titulo: string = 'Alta de un nuevo software';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;

  constructor(private _softwareService: SoftwareService, private _aroute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];
    if (this.tipo == 1) {
      this.titulo = 'Modificar datos del dispositivo de red (' + this.id + ')';
      this.traeSoftware(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar un dispositivo de red (' + this.id + ')';
      this.txtBtn = 'Borrar';
      this.traeSoftware(this.id);
    }
  }

  //Me traigo el listado de software
  private traeSoftware(id: number) {
    this._softwareService.obtengoSoftwareID(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.softwareAct = resultado;
        } else {
          this.toastr.error(resultado, 'Error obteniendo el ordenador');
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
  //Controlamos si los datos del formulario se guardan, se modifican o se borran en funcion del tipo que sean declarado mas arriba
  guardaSoftware(): void {
    if (this.softwareForm?.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._softwareService.guardaSoftware(this.softwareAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Software agregado');
              this.router.navigate(['/software']);
            } else {
              this.toastr.error('Error al agregar el software');
            }
          },
          error: (error) => {
            this.toastr.error('Error al agregar el software: ', error);
          },
          complete: () => {
            this.toastr.success('Operacion completada');
          },
        });
      } else if (this.tipo == 1) {
        console.log(this.softwareAct);
        this._softwareService.modificaSoftware(this.id, this.softwareAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              console.log(resultado);
              console.log(this.softwareAct);
              this.toastr.success('Datos modificados');
              this.router.navigate(['/software']);
            } else {
              this.toastr.error('Error al modificar el software');
            }
          },
          error: (error) => {
            this.toastr.error('Error al modificar el software: ', error);
          },
          complete: () => {
            this.toastr.success('Modificacion completada');
          },
        });
      } else if (this.tipo == 2) {
        this._softwareService.borraSoftware(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Dispositivo red eliminado');
              this.router.navigate(['/software']);
            } else {
              this.toastr.error('Error al eliminar el dispositivo de red');
            }
          },
          error: (error) => {
            this.toastr.error('Error al eliminar el dispositivo de red:', error);
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

  //Evitamos enviar datos del formulario en la url cuando cancelamos
  cancelar(event : Event) : void {
    event.preventDefault();
    this.router.navigate(['/software'], { queryParams: {} });
  }

  //Funcion para poder realizar validaciones en los formularios de forma visual
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
}
