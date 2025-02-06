import { Component } from '@angular/core';
import { Ordenadores } from '../../ordenadores';
import { OrdenadoresService } from '../../ordenadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ordenadores',
  templateUrl: './ordenadores.component.html',
  styleUrl: './ordenadores.component.css'
})
export class OrdenadoresComponent {
  public ordenadorAct: Ordenadores = { 
    id: 0, 
    numero: '', 
    idMarca: 0, 
    modelo: '', 
    idUbicacion: 0, 
    nombre: '', 
    tipo: '', 
    numeroSerie: '', 
    red: '', 
    macLAN: '', 
    macWifi: '', 
    ipWifi: '', 
    hd1: '', 
    hd2: '', 
    observaciones: '' 
  };

  constructor(private _ordenadoresService: OrdenadoresService, private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService) {}

  private traeOrdenador() {
    this._ordenadoresService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado.mensaje == "OK") {
          this.ordenadorAct = resultado.datos;
        } else {
          this.toastr.error(resultado.mensaje, 'Error al obtener el ordenador');
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

}
