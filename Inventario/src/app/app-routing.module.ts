import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './marca/components/lista/lista.component';
import { MarcaComponent } from './marca/components/marca/marca.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/components/login/login.component';
import { LogoutComponent } from './login/components/logout/logout.component';
import { RegistroComponent } from './registro/components/registro/registro.component';
import { OrdenadoresComponent } from './ordenadores/components/ordenadores.component';

const routes: Routes = [
  { path : 'bienvenida', component : BienvenidaComponent },
  { path : 'login', component: LoginComponent },
  { path : 'logout', component: LogoutComponent },
  { path : 'registro', component: RegistroComponent },
  { path: 'bienvenido', component: BienvenidoComponent, /*canActivate: [loginGuard]*/ },
  { path: 'marcas', component: ListaComponent, /*canActivate: [loginGuard]*/ },
  { path: 'ordenadores', component: OrdenadoresComponent },
  { path: 'marcas/:tipo/:id', component: MarcaComponent, /*canActivate: [loginGuard, empleadoGuard],
canDeactivate: [abandonarPaginaGuard],*/ },
{ path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
{ path: '**', redirectTo: '/bienvenida', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
