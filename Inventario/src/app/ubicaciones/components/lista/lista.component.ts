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
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  // Definición del array que almacenará las ubicaciones obtenidas del servicio
  public ubicaciones: any;

  // Configuración de opciones para la tabla de datos
  dtOptions: Config = {};

  // Inyección del servicio UbicacionesService
  constructor(private _ubicacionesService: UbicacionesService) { }

  ngOnInit() {

    // Configuración de la paginación y del idioma para la tabla de datos
    this.dtOptions = {
      pagingType: 'full_numbers', // Tipo de paginación
      language: { // Configuración del idioma para los mensajes en la tabla
        processing: "Procesando...",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en esta tabla",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: { // Configuración de los botones de paginación
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      },
    };

    // Llamada al servicio para obtener las ubicaciones desde la API
    this._ubicacionesService.obtengoUbicacionesApi().subscribe({
      next: (resultado) => {        
        // Si se recibe un resultado válido, se asigna a la variable ubicaciones
        if (resultado) {
          this.ubicaciones = resultado;
        } else {
          // Si hay un error en los datos recibidos, se muestra en la consola
          console.error('Error al recibir datos:', resultado.error);
        }
      },
      error: (error) => {
        // Si ocurre un error en la petición, se muestra en la consola
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        // Mensaje de confirmación cuando la operación ha finalizado correctamente
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

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    
    // Crear un libro de Excel y añadir la hoja
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Ubicaciones');
  
    // Guardar el archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'ubicacions.xlsx');
  }
}
