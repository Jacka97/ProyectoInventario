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
import { RegistroComponent } from './registro/components/registro/registro.component';
import { OrdenadoresModule } from './ordenadores/ordenadores.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';






@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    BienvenidoComponent,
    EncabezadoComponent,
    BienvenidaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarcaModule,
    UbicacionesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    OrdenadoresModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
