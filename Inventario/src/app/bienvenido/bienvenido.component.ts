import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-bienvenido',
  standalone: false,
  
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {
  constructor(private _titleService:Title){}
  ngOnInit(){
    this._titleService.setTitle('Bienvenido a Angular app!!!')
  }
}
