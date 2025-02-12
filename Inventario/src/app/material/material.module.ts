import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { MaterialComponent } from './components/material/material.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { SalidasComponent } from './components/salidas/salidas.component';
import { EntradasComponent } from './components/entradas/entradas.component';



@NgModule({
  declarations: [
    ListaComponent,
    MaterialComponent,
    SalidasComponent,
    EntradasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ]
})
export class MaterialModule { }
