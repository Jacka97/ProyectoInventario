import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ListaComponent } from './components/lista/lista.component';



@NgModule({
  declarations: [
    UbicacionComponent,
    ListaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UbicacionesModule { }
