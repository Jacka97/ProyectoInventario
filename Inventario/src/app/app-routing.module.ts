import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './marca/components/lista/lista.component';
import { MarcaComponent } from './marca/components/marca/marca.component';

const routes: Routes = [
  { path: 'marcas', component: ListaComponent, /*canActivate: [loginGuard]*/ },
  { path: 'marcas/:tipo/:id', component: MarcaComponent, /*canActivate: [loginGuard, empleadoGuard],
canDeactivate: [abandonarPaginaGuard],*/ },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
