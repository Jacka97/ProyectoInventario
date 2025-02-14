import { Component, ViewChild } from '@angular/core';
import { Ordenadores } from '../../ordenadores';
import { OrdenadoresService } from '../../ordenadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { Ubicacion } from '../../ubicacion';
import { Marca } from '../../marca';


@Component({
  selector: 'app-ordenadores',
  standalone: false,
  templateUrl: './ordenadores.component.html',
  styleUrl: './ordenadores.component.css'
})
export class OrdenadoresComponent {
  @ViewChild('ordenadorForm', { static: true }) ordenadorForm: NgForm | undefined;
  public marcaat: Marca = {id: 0, nombre: ''};
  public marcas: Marca[] = []; 
  public ubiact: Ubicacion = {id: 0, nombre: ''};
  public ubis: Ubicacion[] = []; 
  public ordenadorAct: Ordenadores = {
    
    numero: '',
    idMarca: 0,
    marca_nombre: '',
    modelo: '',
    idUbicacion: 0,
    ubicacion_nombre: '',
    ordenador_nombre: '',
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
  public titulo: string = 'Alta de un nuevo ordenador';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;

  constructor(private _ordenadoresService: OrdenadoresService, private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService) { }


  //Distigue que tipo de accion vamos a realizar dentro de la lista
  ngOnInit() {
    this.traerMarcas();
    this.traerUbis();
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
  private traerMarcas(){
    this._ordenadoresService.obtengoMarcas().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.marcas = resultado;
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
  private traerUbis(){
    this._ordenadoresService.obtengoUbicaciones().subscribe({
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
  guardaOrdenador(): void {
    console.log('Formulario válido:', this.ordenadorForm?.valid);
    console.log('Datos del ordenador:', this.ordenadorAct);
    if (this.ordenadorForm!.valid || this.tipo == 2) {
      console.log('Enviando datos al servicio...');
      this.formularioCambiado = false;
      console.log(JSON.stringify(this.ordenadorAct));
      if (this.tipo == 0) {
        this._ordenadoresService.guardaNuevoOrdenador(this.ordenadorAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Ordenador Agregado');
              this._route.navigate(['/ordenadores']);
            } else {
              this.toastr.error('Error al agregar el ordenador');
            }
          },
          error: (error) => {
            this.toastr.error('Error al agregar el ordenador: ', error);
          },
          complete: () => {
            this.toastr.success('Operacion completada');
          },
        });
      } else if (this.tipo == 1) {
        this._ordenadoresService.modificaOrdenador(this.id, this.ordenadorAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              console.log(resultado);
              console.log(this.ordenadorAct);
              this.toastr.success('Datos modificados');
              this._route.navigate(['/ordenadores']);
            } else {
              this.toastr.error('Error al modificar el ordenador');
            }
          },
          error: (error) => {
            this.toastr.error('Error al modificar el ordenador: ', error);
          },
          complete: () => {
            this.toastr.success('Modificacion completada');
          },
        });
      } else if (this.tipo == 2) {
        this._ordenadoresService.borraOrdenador(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Ordenador eliminado');
              this._route.navigate(['/ordenadores']);
            } else {
              this.toastr.error('Error al eliminar el ordenador');
            }
          },
          error: (error) => {
            this.toastr.error('Error al eliminar el ordenador:', error);
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
  private traeOrdenador(id: number) {
    this._ordenadoresService.obtengoOrdenador(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ordenadorAct = resultado;
          console.log(resultado);
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
