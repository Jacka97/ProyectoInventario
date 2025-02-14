import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listadoMateriales } from './components/lista/lista.component';
import { MaterialComponent } from './components/material/material.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    listadoMateriales,
    MaterialComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ]
})
export class MaterialModule { }
