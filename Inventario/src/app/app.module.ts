import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsersModule } from './users/users.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaModule } from './marca/marca.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { LoginModule } from './login/login.module';
import { OrdenadoresModule } from './ordenadores/ordenadores.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';
import { PerifeModule } from './perifericos/perifericos.module';
import { DispositivosRedModule } from './dispositivos-red/dispositivos-red.module';







@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    EncabezadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarcaModule,
    UsersModule,
    LoginModule,
    UbicacionesModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    OrdenadoresModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    PerifeModule,
    DispositivosRedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
