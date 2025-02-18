import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { PeriService } from '../../perifericos.service';
import { Periferico } from '../../perifericos';
import { data } from 'jquery';
import { Ordenadores } from '../../ordenadores';
import { Marca } from '../../marca';
import { Ubicacion } from '../../ubicacion';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './perifericos.component.html',
  styleUrl: './perifericos.component.css'
})
export class PerifeComponent {
  @ViewChild('perifeForm', { static: true }) perifeForm: NgForm | undefined;
  public periact: Periferico = {periferico_nombre: '', nombre:'', ordenador_id: 0, ordenador_nombre: '', marca_nombre: '', marca_id: 0, idUbicacion: 0, ubicacion_nombre:'', precio: 0, numeroSerie: "0"};
  public ordenadorAct: Ordenadores = {
    id: 0,
    numero: '',
    idMarca: 0,
    marca_nombre: '',
    modelo: '',
    idUbicacion: 0,
    ubicacion_nombre: '',
    ordenador_nombre: '',
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
  };
  public ordenadores: Ordenadores[] = [];
  public marcaat: Marca = {id: 0, nombre: ''};
  public marcas: Marca[] = []; 
  public ubiact: Ubicacion = {id: 0, nombre: ''};
  public ubis: Ubicacion[] = []; 
  public titulo: string = 'Nuevo Periferico';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public inputChecked: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _perifeService: PeriService, private _route: Router, private toastr: ToastrService) { }

  //Al iniciar la pagina, nos traemos los listados de ubicaciones, marcas y ordenadores y en funcion del tipo de opcion que queramos se cambiara el titulo
  ngOnInit() {
    this.traerMarcas();
    this.traerOrdenadores();
    this.traerUbicaciones();
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

  //Me traigo el listado de los ordenadores a traves de su servicio
  private traerOrdenadores() {
    this._perifeService.obtengoOrdenadores().subscribe({
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

    //Me traigo el listado de las ubicaciones a traves de su servicio
  private traerUbicaciones() {
    this._perifeService.obtengoUbicaciones().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ubis = resultado;
        } else {
          this.toastr.error('Error al obtener la ubicacion:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener la ubicacion:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
    //Me traigo el listado de las marcas a traves de su servicio
  private traerMarcas() {
    this._perifeService.obtengoMarcas().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.marcas = resultado;
        } else {
          this.toastr.error('Error al obtener las marcas:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener las marcas:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

    //Me traigo el listado de los perifericos traves de su servicio
  private traePeri(id: number) {
    this._perifeService.obtengoPeriAPI(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.periact = resultado;
          if (this.periact.ordenador_id === null) {
            this.periact.ordenador_id = -1;
          }
          
        } else {
          this.toastr.error('Error al obtener el periferico:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener el periferico:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  //Guardamos los nuevos perifericos y controlamos si tambien queremos modificarlos o borrarlos
  guardaPeri(): void {
    if (this.perifeForm!.valid || this.tipo == 2) {
      //El borrado era readonly
      this.formularioCambiado = false;
  
      
  
    if (this.tipo === 0) {
      // Crear usuario
      console.log(this.periact);
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
      console.log(this.periact);

      console.log(this.id);
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
          console.log(error);
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