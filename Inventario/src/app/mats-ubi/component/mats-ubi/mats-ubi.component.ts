import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NOUbi } from '../../ubisO&N';
import { Ubicacion } from '../../ubicacion';
import { MatsUbiService } from '../../mats-ubi.service';
import { ToastrService } from 'ngx-toastr';
import { Lista } from '../../lista';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-mats-ubi',
  templateUrl: './mats-ubi.component.html',
  styleUrl: './mats-ubi.component.css'
})
export class MatsUbiComponent {
  @ViewChild('NOUbis', { static: true }) NOUbis: NgForm | undefined;

  public noubisact: NOUbi = { idUbicacionActual: 0, idUbicacionNueva: 0 };
  public ubis: Ubicacion[] = [];
  public listadoact: Lista[] = [];
  public titulo: string = 'Modificar Ubicación';
  public idSeleccionado: number = -1;


users: any;
  dtOptions: Config = {}; // Cambia de Config a DataTables.Settings
  dtTrigger: Subject<any> = new Subject();
  public mostrarFormulario: boolean = false;

  constructor(private _noubisService: MatsUbiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.traerUbicaciones();
    this.onUbicacionSeleccionada();
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
  }
}

  // 🔹 Obtiene todas las ubicaciones disponibles
  private traerUbicaciones() {
    this._noubisService.getAllUbis().subscribe({
      next: (resultado) => {
        if (Array.isArray(resultado)) {
          this.ubis = resultado;
          //this.idSeleccionado = -1; // Valor inicial para el select
        } else {
          console.error('Error: la respuesta no es un array válido', resultado);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
        this.toastr.error('Error al obtener las ubicaciones');
      },
      complete: () => {
        console.log('Operación completada - Ubicaciones cargadas');
      }
    });
  }
  

  // 🔹 Obtiene los materiales de una ubicación específica
  // onUbicacionSeleccionada() {
  //   if (this.idSeleccionado) {
  //     this._noubisService.getMaterialesPorUbicacion(this.idSeleccionado).subscribe({
  //       next: (resultado) => {
  //         console.log('📌 API Response:', resultado);
  //         if (!resultado || resultado.length === 0) {
  //           console.warn('⚠️ La API no devolvió datos.');
  //           this.toastr.warning('No hay datos disponibles para esta ubicación.');
  //         } else {
  //           this.listadoact = resultado;
  //         }
  //       },
  //       error: (error) => {
  //         console.error('❌ Error al recibir datos:', error);
  //       }
  //     });
  //   }
  // }
  onUbicacionSeleccionada() {
    if (this.idSeleccionado === -1) {
      return; // Salir de la función si idSeleccionado es -1
    }
  
    console.log('🔍 Solicitando datos para ID:', this.idSeleccionado);
  
    this._noubisService.getMaterialesPorUbicacion(this.idSeleccionado).subscribe({
      next: (resultado) => {
        console.log('📌 Respuesta API:', resultado);
  
        if (Array.isArray(resultado)) {
          this.listadoact = resultado;
          console.log('✅ Datos guardados correctamente:', this.listadoact);
        } else {
          console.error('❌ API no devolvió un array válido', resultado);
          this.toastr.error('La API no devolvió datos correctos.');
        }
      },
      error: (error) => {
        console.error('❌ Error al recibir datos:', error);
        if (error.status === 500) {
          console.error('🔥 Error interno en el servidor');
          this.toastr.error('Error interno en la API.');
        } else {
          this.toastr.error('Error al obtener los datos.');
        }
      },
      complete: () => {
        console.log('✅ Operación completada.');
      }
    });
  }
  
  
  
  
  

  // 🔹 Modifica la ubicación de los materiales
  modificarUbicacion() {
    this.noubisact.idUbicacionActual = this.idSeleccionado;
  
    if (this.noubisact.idUbicacionNueva !== null && this.noubisact.idUbicacionNueva !== undefined && this.noubisact.idUbicacionNueva >= 0) {
      this._noubisService.updateUbicacionMateriales(this.noubisact).subscribe({
        next: (resultado) => {
          if (resultado) {
            this.toastr.success('Ubicación modificada con éxito');
            this.mostrarFormulario = false;
            this.onUbicacionSeleccionada(); // Recargar lista de materiales
          } else {
            console.error('Error: No se pudo modificar la ubicación', resultado);
          }
        },
        error: (error) => {
          console.error('Error al modificar ubicación:', error);
          this.toastr.error('Error al modificar la ubicación');
        },
        complete: () => {
          console.log('Operación completada - Ubicación modificada');
        }
      });
    } else {
      this.toastr.warning('Seleccione una nueva ubicación válida.');
    }
  }
  descargarPDF() {
    const doc = new jsPDF(); // Crear instancia de jsPDF
    // Agregar título o texto opcional
    doc.text('Listado de materiales', 14, 10);
    // Seleccionar la tabla y convertirla a un formato adecuado
    autoTable(doc, {
    html: '#materiales', // Selecciona la tabla por su ID
    startY: 20, // Define la posición inicial en Y
    });
    // Guardar el PDF con un nombre
    doc.save('materiales.pdf');
    }
  
    /*descargar excel */
  descargarExcel() {
      // Seleccionar la tabla en el DOM
      let element = document.getElementById('materiales');
      
      // Convertir la tabla a una hoja de Excel
      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      
      // Crear un libro de Excel y añadir la hoja
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Listado de Perifericos');
    
      // Guardar el archivo
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(data, 'materiales.xlsx');
    
    
    }
  
}
