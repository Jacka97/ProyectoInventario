import { Component } from '@angular/core';
import { Config } from 'datatables.net';
/*para descargar pdf */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { SoftwarePcService } from '../../software-pc.service';

@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrl: './lista.component.css'
  })

  export class ListaComponent {
    softwarePc: any;
    dtOptions: Config = {};

    constructor(private _softwarePcService : SoftwarePcService) {}

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
    
        this._softwarePcService.obtengoTodoSoftwarePc().subscribe({
          next: (resultado) => {
            if (resultado) {
              this.softwarePc = resultado;
            } else {
              console.error('Error al recibir los datos: ', resultado);
            }
          },
          error: (error) => {
            console.error('Error al recibir los datos: ', error);
          },
          complete: () => {
            console.log('Operacion completada');
          },
        })
    }

    descargarPDF() {
        const doc = new jsPDF('l', 'pt', 'a4'); //Doy formato al documento para que se muestre en tipo landscape y el tamaño de folio estandar (Din-A4)
        doc.text('Listado de los softwares con PC', 50, 30);
        
        autoTable(doc, {
          html: '#tbsoftwarePc', 
          startY: 50,
          styles: {fontSize: 8}
        });
        doc.save('listadoAsignacionSoftwares.pdf');
      }
    
      descargarExcel() {
        let element = document.getElementById('tbsoftwarePc');
    
        const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
        
        const workbook: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de los software con PC');
    
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'listadoAsignacionSoftwares.xlsx');
      }
    

  }