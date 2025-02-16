import { Component, ViewChild } from '@angular/core';
import { dispositivosRed } from '../../dispositivos-red';
import { DispositivosRedService } from '../../dispositivos-red.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { Ubicacion } from '../../ubicacion';
import { Marca } from '../../marca';

@Component({
  selector: 'app-dipositivos',
  templateUrl: './dispositivos.component.html',
  styleUrl: './dispositivos.component.css'
})
export class DispositivosComponent {
  @ViewChild('dispoRedForm', { static: true }) dispoRedForm: NgForm | undefined;

  //Declaracion de los objetos como array para poder gestionar sus datos mas comodamente en el html
  public marcaat: Marca = { id: 0, nombre: '' };
  public marcas: Marca[] = [];
  public ubiact: Ubicacion = { id: 0, nombre: '' };
  public ubis: Ubicacion[] = [];
  public dispoRedAct: dispositivosRed = {

    dispositivo_nombre: '',
    nombre: '',
    idUbicacion: 0,
    ubicacion_nombre: '',
    marca_nombre: '',
    idMarca: 0,
    modelo: '',
    Red: '',
    MACWIFI: '',
    IPWIFI: '',
    MACLAN: '',
    IPLAN: '',
    tipoConexion: '',
    tipoDisp: '',
    Observaciones: '',
    precio: 0
  };

  public titulo: string = 'Alta de un nuevo dispositivo de red';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;

  constructor(private _dispositivosRedService: DispositivosRedService, private _aroute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  //Distigue que tipo de accion vamos a realizar dentro de la lista
  ngOnInit() {
    this.traerMarcas();
    this.traerUbis();
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];

    if (this.tipo == 1) {
      this.titulo = 'Modificar datos del dispositivo de red (' + this.id + ')';
      this.traeDispRed(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar un dispositivo de red (' + this.id + ')';
      this.txtBtn = 'Borrar';
      this.traeDispRed(this.id);
    }
  }

//Me traigo todo el listado de los dispositivos
  private traeDispRed(id: number) {
    this._dispositivosRedService.obtengoDispoRedID(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.dispoRedAct = resultado;
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

  //Me traigo las marcas para su posterior manejo de los datos recibidos
  private traerMarcas() {
    this._dispositivosRedService.obtengoMarcas().subscribe({
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

  //Me traigo las ubicaciones para poder manejar los datos que se consideren
  private traerUbis() {
    this._dispositivosRedService.obtengoUbicaciones().subscribe({
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
  guardaDispositivoRed(): void {
    if (this.dispoRedForm?.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      if (this.tipo == 0) {
        this._dispositivosRedService.guardaNuevoDispoRed(this.dispoRedAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Dispositivo de red agregado');
              this.router.navigate(['/dispositivos-red']);
            } else {
              this.toastr.error('Error al agregar el dispositivo de red');
            }
          },
          error: (error) => {
            this.toastr.error('Error al agregar el dispositivo de red: ', error);
          },
          complete: () => {
            this.toastr.success('Operacion completada');
          },
        });
      } else if (this.tipo == 1) {
        console.log(this.dispoRedAct);
        this._dispositivosRedService.modificaDispoRed(this.id, this.dispoRedAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              console.log(resultado);
              console.log(this.dispoRedAct);
              this.toastr.success('Datos modificados');
              this.router.navigate(['/dispositivos-red']);
            } else {
              this.toastr.error('Error al modificar el dispositivo de red');
            }
          },
          error: (error) => {
            this.toastr.error('Error al modificar el dispositivo de red: ', error);
          },
          complete: () => {
            this.toastr.success('Modificacion completada');
          },
        });
      } else if (this.tipo == 2) {
        this._dispositivosRedService.borraDispoRed(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Dispositivo red eliminado');
              this.router.navigate(['/dispositivos-red']);
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

  //Evitamos enviar datos del formulario en la url cuando cancelamos
  cancelar(event : Event) : void {
    event.preventDefault();
    this.router.navigate(['/software-pc'], { queryParams: {} });
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
