import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DispositivosRedService } from '../../dispositivos-red.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  dispoRed: any;
  dtOptions: Config = {};

  constructor(private _dispositivosRedService: DispositivosRedService) { }

  //Montamos la tabla
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
          first: '«',
          last: '»',
          next: '›',
          previous: '‹'
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
    };

    //Me traigo el listado de todos los dispositivos de red
    this._dispositivosRedService.obtengoDispoRed().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.dispoRed = resultado;
        } else {
          console.error('Error al recibir los datos: ', resultado);
        }
      },
      error: (error) => {
        console.error('Error al recibir los datos:', error);
      },
      complete: () => {
      },
    });
  }

  descargarPDF() {
    const doc = new jsPDF('l', 'pt', 'a4'); //Doy formato al documento para que se muestre en tipo landscape y el tamaño de folio estandar (Din-A4)
    doc.text('Listado de los dispositivos de red', 50, 30);
    
    autoTable(doc, {
      html: '#tbdispored', 
      startY: 50,
      styles: {fontSize: 8}
    });
    doc.save('listadoDispRed.pdf');
  }

  descargarExcel() {
    let element = document.getElementById('tbdispored');

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de los dispositivos de red');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'listadoDispoRed.xlsx');


  }
}
