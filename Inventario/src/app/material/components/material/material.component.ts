import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { OrdenadoresService } from '../../../ordenadores/ordenadores.service';
import { PeriService } from '../../../perifericos/perifericos.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrl: './material.component.css',
})
export class MaterialComponent implements OnInit {
  dtOptions: Config = {};
  opcionSelect: string = '1';
  datos: any[] = []; // lo inicializo como un array

  constructor(
    private _ordenadoresService: OrdenadoresService,
    private _periService: PeriService,
    private cdRef: ChangeDetectorRef //para forzar que detecte los cambios
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
    //this.opcionSelect = option;
    console.log(this.opcionSelect);
    this.datos=[];
    switch (this.opcionSelect) {
      case '1': // Ordenadores
        this._ordenadoresService.obtengoOrdenadores().subscribe({
          next: (resultado) => {
            this.datos = resultado || []; // Si resultado es null, asigna un array vacío
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
            this.datos = resultado || [];
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
}
