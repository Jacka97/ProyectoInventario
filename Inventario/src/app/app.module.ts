import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaModule } from './marca/marca.module';
import { ToastrModule } from 'ngx-toastr';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { LoginModule } from './login/login.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    EncabezadoComponent,
    BienvenidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarcaModule,
    UbicacionesModule,
    LoginModule,
    ToastrModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
