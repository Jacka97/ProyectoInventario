import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarcaModule } from './marca/marca.module';
import { ToastrModule } from 'ngx-toastr';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    EncabezadoComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarcaModule,
    ToastrModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
