import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaModule } from './marca/marca.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginModule } from './login/login.module';
import { AuthModule } from './registro/registro.module';
import { OrdenadoresComponent } from './ordenadores/components/ordenadores.component';


@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    EncabezadoComponent,
    BienvenidaComponent,
    OrdenadoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarcaModule,
    BrowserAnimationsModule,
    LoginModule,
    AuthModule,
    ToastrModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
