import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { ListaComponent } from './components/lista/lista.component';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


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
