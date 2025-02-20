import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatsUbiComponent } from './component/mats-ubi/mats-ubi.component';

import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    MatsUbiComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ],
  providers: [provideHttpClient()],
  exports: [
    MatsUbiComponent,
  ],
})
export class MatsUbiModule { }
