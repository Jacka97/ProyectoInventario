import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from '../registro/components/registro/registro.component';
import { registroService } from './registro.service';

@NgModule({
  declarations: [RegistroComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [registroService]
})
export class AuthModule { }
