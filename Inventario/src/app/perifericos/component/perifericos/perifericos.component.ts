import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { PeriService } from '../../perifericos.service';
import { Periferico } from '../../perifericos';
import { data } from 'jquery';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './perifericos.component.html',
  styleUrl: './perifericos.component.css'
})
export class PerifeComponent {
  @ViewChild('perifeForm', { static: true }) userForm: NgForm | undefined;
  public periact: Periferico = {nombre: '', ordenador_id: 0, marca_id: 0, precio: 0};
  public titulo: string = 'Nuevo Periferico';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public inputChecked: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _perifeService: PeriService, private _route: Router, private toastr: ToastrService) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Usuario (' + this.id + ')';
      this.traePeri(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Usuario (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traePeri(this.id);
    }
  }
  private traePeri(id: number) {
    this._perifeService.obtengoPeriAPI(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.periact = resultado;
        } else {
          this.toastr.error('Error al obtener el usuario:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener el usuario:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaPeri(): void {

  
    this.formularioCambiado = false;
  
    if (this.tipo === 0) {
      // Crear usuario

      // Enviamos el nuevo usuario al API para crearlo en la base de datos
     
      this._perifeService.crearPeriAPI(this.periact).subscribe({
        next: (resultado) => {
          if (resultado) {
            this.toastr.success("Periferico creado:", resultado);
            this._route.navigate(["/perifericos"]); // Redirección corregida
          } else {
            this.toastr.error("Error al crear el periferico:", resultado);
          }
        },
        error: (error) => {
          this.toastr.error("Error al crear el periferico:", error.error?.errores || error);
        },
        complete: () => {
          this.toastr.success("Operación completada.");
        },
      });
    } else if (this.tipo === 1) {
      this.toastr.success(`Periferico modificado: ${this.id}`);
      // Modificar usuario
     
      this._perifeService.modificaPeriAPI(this.id, this.periact).subscribe({
        
        next: (resultado) => {
          if (resultado) {
            this.toastr.success("Periferico modificado:", resultado);
            this._route.navigate(["/perifericos"]); // Redirección corregida
          } else {
            this.toastr.error("Error al modificar el periferico:", resultado);
          }
        },
        error: (error) => {
          this.toastr.error("Error al modificar el periferico:", error.error?.errores || error);
        },
        complete: () => {
          this.toastr.success("Operación completada.");
        },
      });
    }
  
    // this.toastr.success(`Usuario modificado: ${this.id}`);
      else if (this.tipo == 2) {
        console.log(this.id);
        this._perifeService.borraPeriAPI(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Valor eliminado:', resultado);
              this._route.navigate(['/perifericos']);
            } else {
              this.toastr.error('Error al eliminar el periferico:', resultado);
            }
          },
          error: (error) => {
            this.toastr.error('Error al borrar el periferico:', error.error.errores);
          },
          complete: () => {
            this.toastr.success('Operación completada.');
          },
        });
      
    } else alert("El formulario tiene campos inválidos");
  }
  cambiado(): void {
    this.formularioCambiado = true;
  }
  // Método que será llamado por el guard
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
  cancelar(event: Event): void {
    event.preventDefault(); // Previene que el formulario intente enviarse
    this._route.navigate(['/perifericos'], { queryParams: {} });
    }

}