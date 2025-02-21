import { Component } from '@angular/core';
import { OrdenadoresService } from '../../ordenadores.service';
import { Config } from 'datatables.net';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  // public filterSearch : string = '';
  ordenadores: any;
  dtOptions: Config = {};

  constructor(private _ordenadoresService: OrdenadoresService) { }

  //Montamos la tabla al iniciar la pagina
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

    //Traigo los ordenadores llamando a su servicio que este a su vez llama a la funcion configurada para que llame a la api
    this._ordenadoresService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.ordenadores = resultado;
        } else {
 
        }
      },
      error: (error) => {
     
      },
      complete: () => {

      },
    });
  }

  descargarPDF() {
    const doc = new jsPDF('l', 'pt', 'a4'); //Doy formato al documento para que se muestre en tipo landscape y el tamaño de folio estandar (Din-A4)
    doc.text('Listado de ordenadores', 50, 30);

    autoTable(doc, {
      html: '#tbordenadores',
      startY: 50,
      styles: {fontSize: 8}
    });
    doc.save('listadoOrdenadores.pdf');
  }

  descargarExcel() {
    let element = document.getElementById('tbordenadores');

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);


    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de ordenadores');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'listadoOrdenadores.xlsx');


  }
}

