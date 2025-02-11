import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { DipositivosComponent } from './components/dipositivos/dipositivos.component';
import { ListaComponent as listadoDispoRed} from './components/lista/lista.component';



@NgModule({
  declarations: [
    DipositivosComponent,
    listadoDispoRed
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule
  ],
  providers: [provideHttpClient()]
})
export class DispositivosRedModule { }
