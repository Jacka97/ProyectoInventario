import { Component } from '@angular/core';
import { MarcasService } from '../../marcas.service';
import { Config } from 'datatables.net';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-lista',
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
}
