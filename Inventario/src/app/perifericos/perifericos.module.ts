import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { ListaPerifeComponent } from './component/lista/lista.component';
import { PerifeComponent } from './component/perifericos/perifericos.component';

@NgModule({
  declarations: [
    PerifeComponent,
    ListaPerifeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ],
  exports: [
    PerifeComponent,
    ListaPerifeComponent,
    RouterModule,  // Importar para que se pueda usar en otros módulos.
  ]
})
export class PerifeModule { }
