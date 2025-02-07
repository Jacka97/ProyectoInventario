import { Component } from '@angular/core';
import { UbicacionesService } from '../../ubicaciones.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
 // public filterSearch:string = '';
  public cargando:boolean = true;
  public ubicaciones: any;
  constructor(private _ubicacionesService: UbicacionesService) { }
  ngOnInit() {
    this._ubicacionesService.obtengoUbicacionesApi().subscribe({
      next: (resultado) => {        
        if (resultado){
          this.ubicaciones = resultado;
        }else{
          console.error('Error al recibir datos:', resultado.error);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      
    });
  }
}
