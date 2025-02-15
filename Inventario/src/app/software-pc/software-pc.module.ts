import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaComponent as ListaSoftwarePC} from '../software-pc/components/lista/lista.component';
import { provideHttpClient } from '@angular/common/http';
import { SoftwarePcComponent } from './components/software-pc/software-pc.component';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    ListaSoftwarePC,
    SoftwarePcComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule,
    FormsModule
  ],
  providers: [provideHttpClient()]
})
export class SoftwarePcModule { }
