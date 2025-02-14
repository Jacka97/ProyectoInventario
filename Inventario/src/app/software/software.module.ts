import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftwareComponent } from './components/software/software.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { ListaComponent as listadoSoftware } from './components/lista/lista.component';
import { SoftwarePCComponent } from './components/software-pc/software-pc.component';



@NgModule({
  declarations: [
    SoftwareComponent,
    listadoSoftware,
    SoftwarePCComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule
  ],
  providers: [provideHttpClient()]
})
export class SoftwareModule { }
