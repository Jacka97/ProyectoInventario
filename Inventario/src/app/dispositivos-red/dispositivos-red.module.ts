import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { DispositivosComponent } from './components/dispositivos/dispositivos.component';
import { ListaComponent as listadoDispoRed} from './components/lista/lista.component';



@NgModule({
  declarations: [
    DispositivosComponent,
    listadoDispoRed,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule
  ],
   exports: [
    DispositivosComponent,
    listadoDispoRed
  ],
  providers: [provideHttpClient()]
})
export class DispositivosRedModule { }
