import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent {
  constructor(private _titleService: Title, private router : Router) { }
  ngOnInit() {
    this._titleService.setTitle('Bienvenido a Grao Academy')
  }
}
