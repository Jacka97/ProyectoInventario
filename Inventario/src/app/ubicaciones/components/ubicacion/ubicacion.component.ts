import { Component } from '@angular/core';
import { Ubicacion } from '../../ubicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { UbicacionesService } from '../../ubicaciones.service';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  standalone: false,
  styleUrl: './ubicacion.component.css'
})
export class UbicacionComponent {
  @ViewChild('marcaForm', { static: true }) marcaForm: NgForm | undefined;
  public empleadoact: Ubicacion = { id: 0, nombre: ''}
  public titulo: string = 'Nueva Marca';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public ubicacionact: any;

}
