import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { OrdenadoresService } from '../../../ordenadores/ordenadores.service';
import { PeriService } from '../../../perifericos/perifericos.service';
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
export class listadoMateriales {
  ordenadores: any;
  perifericos:any;
  dtOptions: Config = {};
  constructor(private _ordenadoresService: OrdenadoresService, private _periService: PeriService) { }
  ngOnInit() {
  this.dtOptions = {  pagingType: 'full_numbers', language: {
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

  /*obtengo los ordenadores */
this._ordenadoresService.obtengoOrdenadores().subscribe({
  next: (resultado) => {
    if (resultado){
      this.ordenadores = resultado;
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

  /*obtengo los periféricos */
this._periService.obtengoAllPeriAPI().subscribe({
  next: (resultado) => {
    if (resultado){
      this.perifericos = resultado;
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

descargarPDF() {
  const doc = new jsPDF(); // Crear instancia de jsPDF
  // Agregar título o texto opcional
  doc.text('Listado de materiales', 14, 10);
  // Seleccionar la tabla y convertirla a un formato adecuado
  autoTable(doc, {
  html: '#tbmateriales', // Selecciona la tabla por su ID
  startY: 20, // Define la posición inicial en Y
  });
  // Guardar el PDF con un nombre
  doc.save('materiales.pdf');
  }


descargarExcel() {
    // Seleccionar la tabla en el DOM
    let element = document.getElementById('tbmateriales');
    
    // Convertir la tabla a una hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    // Crear un libro de Excel y añadir la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Materiales');
  
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'materiales.xlsx');

  
  }  
}
