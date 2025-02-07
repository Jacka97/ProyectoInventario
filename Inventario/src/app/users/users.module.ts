import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/user/user.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListaUsersComponent } from './components/lista/lista.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    UsersComponent,
    ListaUsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DataTablesModule
  ],
  exports: [
    UsersComponent,
    ListaUsersComponent,
    RouterModule,  // Importar para que se pueda usar en otros módulos.
  ]
})
export class UsersModule { }
