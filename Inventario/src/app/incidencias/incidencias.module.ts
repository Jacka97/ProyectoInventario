import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponentIncidencias } from './components/lista/lista.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { provideHttpClient } from '@angular/common/http';
import { ModificarEstadoComponent } from './components/modificar-estado/modificar-estado.component';

@NgModule({
  declarations: [ListaComponentIncidencias, IncidenciaComponent, ModificarEstadoComponent],
  imports: [CommonModule, FormsModule, RouterModule, DataTablesModule],
  providers: [provideHttpClient()],
  exports: [ListaComponentIncidencias, IncidenciaComponent],
})
export class IncidenciasModule {}
