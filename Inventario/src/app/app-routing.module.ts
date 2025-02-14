import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent as ListaMarcas} from './marca/components/lista/lista.component';
import { MarcaComponent } from './marca/components/marca/marca.component';
import { ListaComponent as ListaUbicaciones  } from './ubicaciones/components/lista/lista.component';
import { UbicacionComponent } from './ubicaciones/components/ubicacion/ubicacion.component';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { LoginComponent } from './login/components/login/login.component';
import { LogoutComponent } from './login/components/logout/logout.component';
import { ListaComponent as ListaOrdenadores} from './ordenadores/components/lista/lista.component';
import { OrdenadoresComponent } from './ordenadores/components/ordenadores/ordenadores.component';
import { UsersComponent } from './users/components/user/user.component';
import { ListaUsersComponent } from './users/components/lista/lista.component';
import { loginGuard } from './login/login.guard';
import { PerifeComponent } from './perifericos/component/perifericos/perifericos.component';
import { ListaPerifeComponent } from './perifericos/component/lista/lista.component';
import { ListaComponent as listadoDispoRed} from './dispositivos-red/components/lista/lista.component';
import { DispositivosComponent } from './dispositivos-red/components/dispositivos/dispositivos.component';
import { listadoMateriales } from './material/components/lista/lista.component';
import { MaterialComponent } from './material/components/material/material.component';
import { ListaComponent as listadoSoftware } from './software/components/lista/lista.component';
import { SoftwareComponent } from './software/components/software/software.component';
import { SoftwarePCComponent } from './software/components/software-pc/software-pc.component';
const routes: Routes = [
  { path : 'login', component: LoginComponent },
  { path: 'bienvenido', component: BienvenidoComponent, canActivate: [loginGuard] },
  { path: 'marcas', component: ListaMarcas, canActivate: [loginGuard]},
  { path: 'ordenadores', component: ListaOrdenadores, canActivate: [loginGuard] },
  { path: 'ordenadores/:tipo/:id', component: OrdenadoresComponent, canActivate: [loginGuard]},
  { path: 'logout', component: LogoutComponent },
  { path: 'users', component: ListaUsersComponent, canActivate: [loginGuard]},
  { path: 'users/:tipo/:id', component: UsersComponent, canActivate: [loginGuard]},
  { path: 'dispositivos-red', component: listadoDispoRed, canActivate: [loginGuard]},
  { path: 'dispositivos-red/:tipo/:id', component: DispositivosComponent, canActivate: [loginGuard]},
  { path: 'perifericos', component: ListaPerifeComponent, canActivate: [loginGuard]},
  { path: 'perifericos/:tipo/:id', component: PerifeComponent, canActivate: [loginGuard]},
  { path: 'marcas/:tipo/:id', component: MarcaComponent, canActivate: [loginGuard] },
  { path: 'ubicaciones', component: ListaUbicaciones , canActivate: [loginGuard] },
  { path: 'ubicaciones/:tipo/:id', component: UbicacionComponent, canActivate: [loginGuard] },
  { path: 'materialesCambioUbicacion', component: MaterialComponent, canActivate: [loginGuard]},
  { path: 'materiales', component: listadoMateriales, canActivate: [loginGuard]},
  { path: 'software', component: listadoSoftware, canActivate: [loginGuard] },
  { path: 'software/:tipo/:id', component: SoftwareComponent, canActivate: [loginGuard]},
  { path: 'software-pc/:tipo/:id', component: SoftwarePCComponent, canActivate: [loginGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
