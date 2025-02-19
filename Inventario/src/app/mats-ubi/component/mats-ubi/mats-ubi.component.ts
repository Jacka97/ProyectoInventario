import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NOUbi } from '../../ubisO&N';
import { Ubicacion } from '../../ubicacion';
import { MatsUbiService } from '../../mats-ubi.service';
import { ToastrService } from 'ngx-toastr';
import { Lista } from '../../lista';

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



  public mostrarFormulario: boolean = false;

  constructor(private _noubisService: MatsUbiService, private toastr: ToastrService) {}

  ngOnInit() {
    this.traerUbicaciones();
    this.onUbicacionSeleccionada();
  }

  // 🔹 Obtiene todas las ubicaciones disponibles
  private traerUbicaciones() {
    this._noubisService.getAllUbis().subscribe({
      next: (resultado) => {
        if (Array.isArray(resultado)) {
          this.ubis = resultado;
          this.idSeleccionado = -1; // Valor inicial para el select
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
  
  
}
