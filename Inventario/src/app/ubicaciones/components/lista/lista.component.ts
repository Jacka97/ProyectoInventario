import { Component } from '@angular/core';
import { UbicacionesService } from '../../ubicaciones.service';

import { Config } from 'datatables.net';

/*para descargar pdf */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
 // public filterSearch:string = '';
  public ubicaciones: any;
  dtOptions: Config = {};

  constructor(private _ubicacionesService: UbicacionesService) { }

  ngOnInit() {

    this.dtOptions = { pagingType: 'full_numbers', language: {
      processing: "Procesando...",
      lengthMenu: "Mostrar _MENU_ registros",
      zeroRecords: "No se encontraron resultados",
      emptyTable: "Ningún dato disponible en esta tabla",
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

    this._ubicacionesService.obtengoUbicacionesApi().subscribe({
      next: (resultado) => {        
        if (resultado){
          this.ubicaciones = resultado;
        }else{
          console.error('Error al recibir datos:', resultado.error);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }

  // DESCARGA EN PDF
  descargarPDF(){
    const doc = new jsPDF();  // Crea instancia de jsPDF

    doc.text('Listado de ubicaciones', 14, 10); //Agrega titulo

    //Selecciona la tabla y la convierte
    autoTable(doc, {
      html: '#tbubicaciones', //Selecciona la tabla por su ID
      startY: 20, //Define la posicion inicial en el eje Y
    });

    //Guarda el PDF con un nombre
    doc.save('ubicaciones.pdf');

  }

  // DESCARGA EN EXCEL
  descargarExcel(){
    let element = document.getElementById('tbubicaciones') as HTMLTableElement; // Seleccionar la tabla en el DOM

    // proceso para eliminar la tabla Acciones
    let clonedTable = element.cloneNode(true) as HTMLTableElement; // Clonar la tabla para no afectar la original

    // Buscar el índice de la columna "Acción"
    let headerCells = clonedTable.rows[0].cells;
    let accionIndex = -1;

    for (let i = 0; i < headerCells.length; i++) {
      if (headerCells[i].textContent?.trim().toLowerCase() === 'acción') {
        accionIndex = i;
        break;
      }
    }

    // Si se encontró la columna "Acción", eliminarla en todas las filas
    if (accionIndex !== -1) {
      Array.from(clonedTable.rows).forEach(row => row.deleteCell(accionIndex));
    }


    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(clonedTable);
    
    // Crear un libro de Excel y añadir la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Marcas');
  
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'marcas.xlsx');
  }
}
