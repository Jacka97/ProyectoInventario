import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  standalone: false,
  
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
  @Input() titulo: string="";
}
