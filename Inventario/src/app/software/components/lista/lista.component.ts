import { Component } from '@angular/core';
import { Config } from 'datatables.net';
/*para descargar pdf */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { SoftwareService } from '../../software.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  software: any;
  dtOptions: Config = {};

  constructor(private _softwareService : SoftwareService) {}

  //Al inicio de la pagina, formamos la tabla
  ngOnInit () {
    this.dtOptions = {
      pagingType: 'full_numbers',
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
      }
    };

    //Me traigo el listado de todos los software a traves de las funciones declaradas en el service
    this._softwareService.obtengoTodoSoftware().subscribe({
      next: (resultado) => {
        if (resultado) {
          this.software = resultado;
        } else {
        }
      },
      error: (error) => {
      },
      complete: () => {
      },
    })
  }

  descargarPDF() {
    const doc = new jsPDF('l', 'pt', 'a4'); //Doy formato al documento para que se muestre en tipo landscape y el tamaño de folio estandar (Din-A4)
    doc.text('Listado de los software', 50, 30);
    
    autoTable(doc, {
      html: '#tbsoftware', 
      startY: 50,
      styles: {fontSize: 8}
    });
    doc.save('listadoSoftware.pdf');
  }

  descargarExcel() {
    let element = document.getElementById('tbsoftware');

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de los software');

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'listadoSoftware.xlsx');
  }
}
