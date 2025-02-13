import { Component, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialesService } from '../../materiales.service';
import { Config } from 'datatables.net';
import * as $ from 'jquery'; // Importar jQuery

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrl: './entradas.component.css'
})
export class EntradasComponent implements AfterViewInit, OnDestroy {
  entradas: any[] = [];
  fechamin: string | null = null;
  fechamax: string | null = null;
  tipo = "insercion";
  dtOptions: Config = {};
  dtInitialized = false;

  constructor(private _movimientosService: MaterialesService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      destroy: true, // Permite reiniciar DataTables
      language: {
        processing: "Procesando...",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en esta tabla",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
          first: '«',
          last: '»',
          next: '›',
          previous: '‹'
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
    };

    this.fechamin = "2025-02-11";
    this.fechamax = "2025-02-12";
    this.recibirDatos();
  }

  ngAfterViewInit() {
    this.initDataTable();
  }

  recibirDatos() {
    this._movimientosService.obtengoMovimientosApi(this.tipo, this.fechamin, this.fechamax).subscribe({
      next: (resultado) => {
        if (Array.isArray(resultado)) {
          this.entradas = [...resultado]; // Clonar el array para asegurar la actualización
          this.cdRef.detectChanges(); // Forzar la actualización en la UI
          this.reloadDataTable(); // Recargar DataTable
        } else {
          console.error('Error: la API no devolvió un array.', resultado);
          this.entradas = [];
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
        this.entradas = [];
      },
      complete: () => console.log('Operación completada.')
    });
  }

  initDataTable() {
    if (!this.dtInitialized) {
      setTimeout(() => {
        ($('#tbentradas') as any).DataTable(this.dtOptions);
        this.dtInitialized = true;
      }, 100);
    }
  }

  reloadDataTable() {
    if (this.dtInitialized) {
      ($('#tbentradas') as any).DataTable().destroy(); // Destruir tabla anterior
      this.dtInitialized = false;
    }
    this.cdRef.detectChanges(); // Asegurar que los datos están en el DOM
    this.initDataTable(); // Volver a inicializar DataTable con los nuevos datos
  }

  ngOnDestroy() {
    if (this.dtInitialized) {
      ($('#tbentradas') as any).DataTable().destroy();
    }
  }
}
