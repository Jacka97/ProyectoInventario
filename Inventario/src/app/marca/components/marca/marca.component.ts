import { Component, ViewChild } from '@angular/core';
import { Marca } from '../../marca';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcasService } from '../../marcas.service';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.css',
})
export class MarcaComponent {
  @ViewChild('marcaForm', { static: true }) marcaForm: NgForm | undefined;
  public marcaact: Marca = { id: 0, nombre: '' };
  public titulo: string = 'Nueva Marca';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  //public inputChecked: boolean = false; //Nueva vble para el checkbox
  constructor(
    private _aroute: ActivatedRoute,
    private _marcasService: MarcasService,
    private _route: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Marca (' + this.id + ')';
      this.traeMarca(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Marca (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeMarca(this.id);
    }
  }
  private traeMarca(id: number) {
    this._marcasService.obtengoMarcaApi(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.marcaact = resultado;
          //  this.inputChecked = this.eact.contratado == 1;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener la marca');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener la marca');
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  /*Insertar/Modificar/Eliminar */
  guardaMarca(): void {
    if (this.marcaForm!.valid || this.tipo == 2) {
      //El borrado era readonly
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._marcasService.guardaNuevaMarcaApi(this.marcaact).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success(
                'Se ha agregado ' + this.marcaact.nombre,
                'Marca agregada correctamente!'
              );
              this._route.navigate(['/marcas']);
            } else {
              this.toastr.error(resultado.errores, 'Error guardando marca');
            }
          },
          error: (error) => {
            this.toastr.error(error.error/*.errores*/, 'Error guardando marca');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      } else if (this.tipo == 1) {
        this._marcasService.modificaMarcaApi(this.id, this.marcaact).subscribe({
          next: (resultado) => {
            console.log(resultado);
            if (resultado) {
              this.toastr.success(
                'Se ha modificado ' + this.marcaact.nombre,
                'Marca modificada correctamente!'
              );
              this._route.navigate(['/marcas']);
            } else {
              this.toastr.error(resultado, 'Error modificando marca');
            }
          },
          error: (error) => {
            this.toastr.error(error.error, 'Error modificando marca');
          },
          complete: () => {
            console.log('Operación completada.');
          },
        });
      } else if (this.tipo == 2) {
        this._marcasService.borraMarcaApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success(
                'Se ha eliminado ' + this.marcaact.nombre,
                'Marca eliminada correctamente!'
              );
              this._route.navigate(['/marcas']);
            } else {
              this.toastr.error(resultado, 'Error eliminando marca');
            }
          },
          error: (error) => {
            this.toastr.error(error.error, 'Error eliminando marca');
          },
          complete: () => {
            console.log('Operación completada.');
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