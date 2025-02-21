import { Component, ViewChild } from '@angular/core';
import { Ubicacion } from '../../ubicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { UbicacionesService } from '../../ubicaciones.service';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  standalone: false,
  styleUrl: './ubicacion.component.css',
})
export class UbicacionComponent {
  @ViewChild('ubicacionForm', { static: true }) ubicacionForm: | NgForm | undefined;
  public ubicacionact: Ubicacion = { id: 0, nombre: '' };
  public titulo: string = 'Nueva Ubicacion';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  //public inputChecked: boolean = false; //Nueva vble para el checkbox
  constructor(
    private _aroute: ActivatedRoute,
    private _ubicacionesService: UbicacionesService,
    private _route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Ubicacion (' + this.id + ')';
      this.traeUbicacion(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Ubicacion (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeUbicacion(this.id);
    }
  }
  private traeUbicacion(id: number) {
    this._ubicacionesService.obtengoUbicacionApi(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ubicacionact = resultado;
          //  this.inputChecked = this.eact.contratado == 1;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener la ubicacion');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la ubicacion');
      },
      complete: () => {
       
      },
    });
  }

  /*Insertar/Modificar/Eliminar */
  guardaUbicacion(): void {
    if (this.ubicacionForm!.valid || this.tipo == 2) {
      //El borrado era readonly
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._ubicacionesService
          .guardaNuevaUbicacionApi(this.ubicacionact)
          .subscribe({
            next: (resultado) => {
              if (resultado) {
                this.toastr.success(
                  'Se ha agregado ' + this.ubicacionact.nombre,
                  'Ubicacion agregada correctamente!'
                );
                this._route.navigate(['/ubicaciones']);
              } else {
                this.toastr.error(resultado.errores, 'Error guardando ubicacion');
              }
            },
            error: (error) => {
              this.toastr.error(error.error, 'Error guardando ubicacion');
            },
            complete: () => {
        
            },
          });
      } else if (this.tipo == 1) {
        this._ubicacionesService
          .modificaUbicacionApi(this.id, this.ubicacionact)
          .subscribe({
            next: (resultado) => {
              if (resultado) {
                this.toastr.success(
                  'Se ha modificado ' + this.ubicacionact.nombre,
                  'Ubicacion modificada correctamente!'
                );
                this._route.navigate(['/ubicaciones']);
              } else {
                this.toastr.error(resultado, 'Error modificando ubicacion');
              }
            },
            error: (error) => {
              this.toastr.error(error.error, 'Error modificando ubicacion');
            },
            complete: () => {
     
            },
          });
      } else if (this.tipo == 2) {
        this._ubicacionesService.borraUbicacionApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success(
                'Se ha eliminado ' + this.ubicacionact.nombre,
                'Marca eliminada correctamente!'
              );
              this._route.navigate(['/ubicaciones']);
            } else {
              this.toastr.error(resultado, 'Error eliminando ubicacion');
            }
          },
          error: (error) => {
            this.toastr.error(error.error, 'Error eliminando ubicacion');
          },
          complete: () => {
     
          },
        });
      }
    } else
      this.toastr.error(
        'El formulario tiene campos inválidos',
        'Error de validación'
      );
  }

  // Método que será llamado por el guard
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres descartar los cambios?'
      );
    }
    return true;
  }
  cambiado(): void {
    this.formularioCambiado = true;
  }
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }
}
