import { Component } from '@angular/core';
import { OrdenadoresService } from '../../ordenadores.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  public filterSearch : string = '';
  ordenadores:any;

  constructor(private _ordenadoresService: OrdenadoresService) {}

  ngOnInit() {
    this._ordenadoresService.obtengoOrdenadores().subscribe({
      next: (resultado) => {
        if (resultado.success) {
          this.ordenadores = resultado.data;
        } else {
          console.error('Error al recibir los datos: ', resultado.message);
        }
      },
      error: (error) => {
        console.error('Error al recibir los datos:', error);
      },
      complete: () => {
        console.log('Operacion completada.');
      }
    });
  }
}
