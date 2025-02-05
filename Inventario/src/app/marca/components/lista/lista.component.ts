import { Component } from '@angular/core';
import { MarcasService } from '../../marcas.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
 // public filterSearch:string = '';
  public cargando:boolean = true;
  public marcas: any;
  constructor(private _marcasService: MarcasService) { }
  ngOnInit() {
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
      
    });
  }
}