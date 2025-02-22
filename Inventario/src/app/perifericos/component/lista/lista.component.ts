import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
/*para descargar pdf */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PeriService } from '../../perifericos.service';


@Component({
  selector: 'app-lista-users',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaPerifeComponent{
  users: any;
  dtOptions: Config = {}; // Cambia de Config a DataTables.Settings
  dtTrigger: Subject<any> = new Subject();
  constructor(private _periService: PeriService) {}

  //Al iniciar la pagina, montamos la tabla
  ngOnInit() {
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

    //Traemos todo el listado de perifericos
    this._periService.obtengoAllPeriAPI().subscribe({
      next: (resultado) => {
        if (Array.isArray(resultado)) {
          this.users = resultado; // Asigna la lista de usuarios
        } else {
        }
      },
      error: (error) => {
      },
      complete: () => {
      }
    });

  }
  /*descargar pdf */
descargarPDF() {
  const doc = new jsPDF(); // Crear instancia de jsPDF
  // Agregar título o texto opcional
  doc.text('Listado de perifericos', 14, 10);
  // Seleccionar la tabla y convertirla a un formato adecuado
  autoTable(doc, {
  html: '#perifericos', // Selecciona la tabla por su ID
  startY: 20, // Define la posición inicial en Y
  });
  // Guardar el PDF con un nombre
  doc.save('perifericos.pdf');
  }

  /*descargar excel */
descargarExcel() {
    // Seleccionar la tabla en el DOM
    let element = document.getElementById('perifericos');
    
    // Convertir la tabla a una hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    // Crear un libro de Excel y añadir la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Perifericos');
  
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'perifericos.xlsx');
  
  
  }
  
}
