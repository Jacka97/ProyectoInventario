import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { OrdenadoresService } from '../../../ordenadores/ordenadores.service';
import { PeriService } from '../../../perifericos/perifericos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.css',
})
export class MaterialComponent implements OnInit {
  dtOptions: Config = {};
  opcionSelect: string = '1'; //por defecto va a cargar los ordenadores
  datos: any[] = []; // lo inicializo como un array
  ordenadores: any;
  perifericos: any;
 // public nuevaUbicacion: number = 0; //nueva ubicación
 // public id: number = 0; //elemento al que le voy a cambiar la ubicación

  constructor(
    private _ordenadoresService: OrdenadoresService,
    private _periService: PeriService,
    private cdRef: ChangeDetectorRef, //para forzar que detecte los cambios
    private _aroute: ActivatedRoute, private _route: Router, private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        processing: 'Procesando...',
        lengthMenu: 'Mostrar _MENU_ registros',
        zeroRecords: 'No se encontraron resultados',
        emptyTable: 'Ningún dato disponible en esta tabla',
        infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
        infoFiltered: '(filtrado de un total de _MAX_ registros)',
        search: 'Buscar:',
        loadingRecords: 'Cargando...',
        paginate: {
          first: '«',
          last: '»',
          next: '›',
          previous: '‹',
        },
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
      },
    };

    this.cargarTabla(); // llamo la función para que por defecto cargue los ordenadores


  }

  cargarTabla() {

    this.ordenadores = []; //vacío los arrays para que al cargar los datos nuevos como lo hace de forma asíncrona no tenga datos
    this.perifericos = [];
    switch (this.opcionSelect) {
      case '1': // Ordenadores
        this._ordenadoresService.obtengoOrdenadores().subscribe({
          next: (resultado) => {
            // this.datos = resultado || []; // Si resultado es null, asigna un array vacío
            this.ordenadores = resultado;
            this.cdRef.detectChanges(); // Fuerza que detecte los cambios al producirse el cambio en el checbox (al generarse el
            //evento. Tengo que hacerlo dentro del subscribe()
          },
          error: (error) => console.error('Error al recibir los datos:', error),
          complete: () => console.log('Carga de ordenadores completada'),
        });
        break;

      case '2': // Periféricos
        this._periService.obtengoAllPeriAPI().subscribe({
          next: (resultado) => {
            this.perifericos = resultado;
            this.cdRef.detectChanges();
          },
          error: (error) => console.error('Error al recibir datos:', error),
          complete: () => console.log('Carga de periféricos completada'),
        });
        break;

      case '3': // Dispositivos de red (aún sin datos)
        this.datos = [];
        this.cdRef.detectChanges();
        break;
    }
  }


/**************Para modificar**************/
cambiarUbicacion(id:number, nuevaUbicacion:number) {
  switch (this.opcionSelect) {
    case '1': // Ordenadores
  /*  this._ordenadoresService.modificaUbicacionOrdenador(id, nuevaUbicacion).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.toastr.success('Datos modificados');
          this._route.navigate(['/materialesCambioUbicacion']);
        } else {
          this.toastr.error('Error al cambiar la ubicación');
        }
      },
      error: (error) => {
        this.toastr.error('Error al modificar la ubicación: ', error);
      },
      complete: () => {
        this.toastr.success('Modificacion completada');
      },
    });*/
      break;

    case '2': // Periféricos

      break;

    case '3': // Dispositivos de red (aún sin datos)

      break;
}
}

}


