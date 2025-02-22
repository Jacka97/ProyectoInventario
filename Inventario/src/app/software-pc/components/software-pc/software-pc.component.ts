import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';

import { Ubicacion } from '../../ubicacion';
import { Software } from '../../software';
import { SoftwarePcService } from '../../software-pc.service';
import { SoftwarePC } from '../../softwarePC';
import { Ordenadores } from '../../ordenadores';



@Component({
    selector: 'app-software-pc',
    templateUrl: './software-pc.component.html',
    styleUrl: './software-pc.component.css'
  })

export class SoftwarePcComponent {
  @ViewChild('softwarePcForm', { static: true }) softwarePcForm: NgForm | undefined;

  //Me traigo los objetos necesarios para hacer las llamadas pertinentes

  public softwarePcAct : SoftwarePC = {
    id : 0,
    idPC : NaN,
    idSoftware : NaN,
    fecha : '',
    softnombre : '',
    pcnombre : '',
    idUbicacion : NaN,
  }

  public softwareAct: Software = {
      id: 0,
      nombre: ''
  }

  public ordenadoresAct : Ordenadores = {
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
  }

  public ubicacionact: Ubicacion = { id: 0, nombre: '' };

  public titulo: string = 'Asignar un software a un PC';
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public tipo: number = 0;
  public id: number = 0;
  public ordenadores : Ordenadores[] = [];
  public ubicaciones : Ubicacion[] = [];
  public software : Software[] = [];
  public softwarePc : SoftwarePC[] = [];
  public enAula: boolean = false;

  toggleSwitch() {
    this.enAula = !this.enAula;
    console.log("Estado actualizado:", this.enAula);
  }

  constructor(private _softwarePcService: SoftwarePcService, private _aroute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  //Cuando inicias la pagina a la que entre se trae los ordenadores y los softwares
  ngOnInit() {
    this.traerOrdenadores();
    this.traeUbicaciones();
    this.traeSoftware();
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id'];
    if (this.tipo == 1) {
      this.titulo = 'Modificar Asignacion (' + this.id + ')';
      this.txtBtn = 'Modificar';
      this.traeSoftwarePc(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Asignacion (' + this.id + ')';
      this.txtBtn = 'Borrar';
      this.traeSoftwarePc(this.id);
    }
  }

  //Me traigo el listado de las ubicaciones a traves de su servicio
  private traeUbicaciones() {
    this._softwarePcService.obtengoUbicacionesApi().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ubicaciones = resultado;
        } else {
          this.toastr.error('Error al obtener la ubicacion:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener la ubicacion:', error);
      },
      complete: () => {
      },
    });
  }

  private traeSoftwarePc(id : number) {
    this._softwarePcService.obtengoSoftwarePcID(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.softwarePcAct = resultado;
        } else {
          this.toastr.error(resultado, 'Error obteniendo software');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el software')
      },
      complete: () => {
      },
    });
  }

  //Me traigo los software llamando a su servicio
  private traeSoftware() {
    this._softwarePcService.obtengoTodoSoftware().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.software = resultado;
        } else {
          this.toastr.error(resultado, 'Error obteniendo el software');
        }
      },
      error: (error) => {
        this.toastr.error(error, 'Error al obtener el software')
      },
      complete: () => {
      },
    });
  }

  //Me traigo los ordenadores llamando a su servicio
  private traerOrdenadores() {
    this._softwarePcService.obtengoOrdenadores().subscribe({
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
      },
    });
  }

  //Controlamos si los datos del formulario se guardan, se modifican o se borran en funcion del tipo que sean declarado mas arriba
  guardaSoftwarePc(): void {
    if (this.softwarePcForm?.valid || this.tipo == 2) {
      this.formularioCambiado = false;
      
      if (this.tipo == 0) {
        this._softwarePcService.guardaSoftwarePC(this.softwarePcAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Software agregado');
              this.router.navigate(['/software-pc']);
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
        this._softwarePcService.modificaSoftwarePC(this.id, this.softwarePcAct).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Datos modificados');
              this.router.navigate(['/software-pc']);
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
        this._softwarePcService.borraSoftwarePC(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Asignacion eliminada');
              this.router.navigate(['/software-pc']);
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

  esInvalido(): boolean {
    return (
      Number.isNaN(this.softwarePcAct.idSoftware)|| 
      (this.enAula && Number.isNaN(this.softwarePcAct.idUbicacion)) || 
      (!this.enAula && Number.isNaN(this.softwarePcAct.idPC))
    );
  }  

  cambiado(): void {
    this.formularioCambiado = true;
  }

  //Evitamos enviar datos del formulario en la url cuando cancelamos
  cancelar(event : Event) : void {
    event.preventDefault();
    this.router.navigate(['/software-pc'], { queryParams: {} });
  }

  //Funcion para poder realizar validaciones en los formularios de forma visual
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }


}