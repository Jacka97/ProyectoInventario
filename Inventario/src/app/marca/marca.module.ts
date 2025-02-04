import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaComponent } from './components/lista/lista.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { MarcaComponent } from './components/marca/marca.component';



@NgModule({
  declarations: [
    MarcaComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  providers: [provideHttpClient()],
  exports: [
    MarcaComponent,
    ListaComponent
  ],
})
export class MarcaModule { }
