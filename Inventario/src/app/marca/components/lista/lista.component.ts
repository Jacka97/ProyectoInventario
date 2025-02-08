import { Component } from '@angular/core';
import { MarcasService } from '../../marcas.service';
import { Config } from 'datatables.net';
/*para descargar pdf */
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
  marcas: any;
  dtOptions: Config = {};
  constructor(private _marcasService: MarcasService) { }
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
  first: "Primero",
  last: "Último",
  next: "Siguiente",
  previous: "Anterior"
  },
  info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
  },
  };
this._marcasService.obtengoMarcasApi().subscribe({
  next: (resultado) => {
    if (resultado){
      this.marcas = resultado;
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

/*descargar pdf */
descargarPDF() {
  const doc = new jsPDF(); // Crear instancia de jsPDF
  // Agregar título o texto opcional
  doc.text('Listado de marcas', 14, 10);
  // Seleccionar la tabla y convertirla a un formato adecuado
  autoTable(doc, {
  html: '#tbmarcas', // Selecciona la tabla por su ID
  startY: 20, // Define la posición inicial en Y
  });
  // Guardar el PDF con un nombre
  doc.save('marcas.pdf');
  }

  /*descargar excel */
descargarExcel() {
    // Seleccionar la tabla en el DOM
    let element = document.getElementById('tbmarcas');
    
    // Convertir la tabla a una hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    // Crear un libro de Excel y añadir la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Marcas');
  
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'marcas.xlsx');
  
  
  }
}