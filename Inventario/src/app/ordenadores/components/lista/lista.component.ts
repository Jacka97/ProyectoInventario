import { Component } from '@angular/core';
import { OrdenadoresService } from '../../ordenadores.service';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  // public filterSearch : string = '';
  ordenadores:any;
  dtOptions: Config = {};

  constructor(private _ordenadoresService: OrdenadoresService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        processing: "Procesando...",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en la tabla",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
    };
    
    this._ordenadoresService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ordenadores = resultado;
        } else {
          console.error('Error al recibir los datos: ', resultado);
        }
      },
      error: (error) => {
        console.error('Error al recibir los datos:', error);
      },
      complete: () => {
        console.log('Operacion completada.');
      },
    });
  }
}
