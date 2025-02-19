import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NOUbi } from '../../ubisO&N';
import { Ubicacion } from '../../ubicacion';
import { MatsUbiService } from '../../mats-ubi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Lista } from '../../lista';

@Component({
  selector: 'app-mats-ubi',
  templateUrl: './mats-ubi.component.html',
  styleUrl: './mats-ubi.component.css'
})
export class MatsUbiComponent {
@ViewChild('NOUbis', { static: true }) NOUbis: NgForm | undefined;

public noubisact: NOUbi = {idUbicacionActual: 0, idUbicacionNueva: 0};
public ubiact: Ubicacion = {id: 0, nombre: ""}; 
public ubis: Ubicacion[] = [];
public listadoact: Lista = { tipo: "", nombre: "", idUbicacion: 0, nombreUbicacion: ""};
public titulo: string = 'Modificar Ubicacion';
public tipo: number = 0;
public id: number = 0;
public txtBtn: string = 'Guardar';
public formularioCambiado: boolean = false;
public inputChecked: boolean = false;
public idSeleccionado: number = 0;

  constructor(private _aroute: ActivatedRoute, private _noubisService: MatsUbiService, private _route: Router, private toastr: ToastrService) { }
  ngOnInit() {
    this.traerUbicaciones();
    // quiero sacar el id de un select, que sera lo que cargue el array de ubicaciones, value es el id y label es el nombre

   
  }
      //Me traigo el listado de las ubicaciones a traves de su servicio
      private traerUbicaciones() {
        this._noubisService.getAllUbis().subscribe({
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
      onUbicacionSeleccionada() {
        if (this.idSeleccionado) {
          this._noubisService.getUbicacionesIdUbicaion(this.idSeleccionado).subscribe({
            next: (resultado) => {
              if (resultado) {
                this.listadoact = resultado;
              } else {
                this.toastr.error('No hay materiales en esta ubicación.');
              }
            },
            error: (error) => {
              this.toastr.error('Error al obtener materiales:', error);
            }
          });
        }
      }
}
