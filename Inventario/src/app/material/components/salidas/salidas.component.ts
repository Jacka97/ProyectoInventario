import { Component } from '@angular/core';
import { MaterialesService } from '../../materiales.service';
import { Config } from 'datatables.net';
/*para descargar pdf */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
/*para descargar excel */
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrl: './salidas.component.css'
})
export class SalidasComponent {
  salidas: any[] = [];

  fechamin: string = "";
  fechamax: string = "";

  tipo = "salida";

  dtOptions: Config = {};
  constructor(private _movimientosService: MaterialesService) { }
  ngOnInit() {
    
    this.dtOptions = {
      pagingType: 'full_numbers', language: {
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

    this.recibirDatos();
  }

  recibirDatos() {
    this.salidas = []; // Vacia el array antes de la llamada
  
    this._movimientosService.obtengoMovimientosApi(this.tipo, this.fechamin, this.fechamax).subscribe({
      next: (resultado) => {
        if (resultado && Array.isArray(resultado)) {
          this.salidas = resultado; // Asigna los datos correctamente
        } else {
          this.salidas = []; // Asegura que el array no sea undefined
        }
      },
      error: (error) => {
        this.salidas = []; // Asegura que la variable no quede en un estado incorrecto
      },
      complete: () => {
      }
    });
  }
  

/*descargar pdf */
descargarPDF() {
  const doc = new jsPDF(); // Crear instancia de jsPDF
  // Agregar título o texto opcional
  doc.text('Listado de salidas', 14, 10);
  // Seleccionar la tabla y convertirla a un formato adecuado
  autoTable(doc, {
  html: '#tbsalidas', // Selecciona la tabla por su ID
  startY: 20, // Define la posición inicial en Y
  });
  // Guardar el PDF con un nombre
  doc.save('salidas.pdf');
  }

  /*descargar excel */
descargarExcel() {
    // Seleccionar la tabla en el DOM
    let element = document.getElementById('tbsalidas');
    
    // Convertir la tabla a una hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    // Crear un libro de Excel y añadir la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Salidas');
  
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'salidas.xlsx');
  
  
  }
}