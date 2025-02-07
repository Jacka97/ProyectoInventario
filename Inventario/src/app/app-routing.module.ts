import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent as ListaMarcas} from './marca/components/lista/lista.component';
import { MarcaComponent } from './marca/components/marca/marca.component';
import { ListaComponent as ListaUbicaciones  } from './ubicaciones/components/lista/lista.component';
import { UbicacionComponent } from './ubicaciones/components/ubicacion/ubicacion.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginComponent } from './login/components/login/login.component';
import { LogoutComponent } from './login/components/logout/logout.component';
import { RegistroComponent } from './registro/components/registro/registro.component';
import { ListaComponent as ListaOrdenadores} from './ordenadores/components/lista/lista.component';
import { OrdenadoresComponent } from './ordenadores/components/ordenadores/ordenadores.component';
import { UsersComponent } from './users/components/user/user.component';
import { ListaUsersComponent } from './users/components/lista/lista.component';
import { loginGuard } from './login/login.guard';

const routes: Routes = [
  { path : 'bienvenida', component : BienvenidaComponent },
  { path : 'login', component: LoginComponent },
  { path : 'logout', component: LogoutComponent },
  { path : 'registro', component: RegistroComponent },
  { path: 'bienvenido', component: BienvenidoComponent, canActivate: [loginGuard] },
  { path: 'marcas', component: ListaMarcas, canActivate: [loginGuard]},
  { path: 'ordenadores', component: ListaOrdenadores, canActivate: [loginGuard] }, 
  { path: 'ordenadores/:tipo/:id', component: OrdenadoresComponent},
  { path: 'logout', component: LogoutComponent },
  { path: 'users', component: ListaUsersComponent, canActivate: [loginGuard]},
  { path: 'users/:tipo/:id', component: UsersComponent, canActivate: [loginGuard]},
  { path: 'marcas/:tipo/:id', component: MarcaComponent, canActivate: [loginGuard] },
  { path: 'ubicaciones', component: ListaUbicaciones , canActivate: [loginGuard] },
  { path: 'ubicaciones/:tipo/:id', component: UbicacionComponent, canActivate: [loginGuard] },
  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: '**', redirectTo: '/bienvenida', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
