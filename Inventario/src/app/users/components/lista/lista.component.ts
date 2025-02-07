import { Component, OnInit } from '@angular/core';
import { UserService } from '../../users.service';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';


@Component({
  selector: 'app-lista-users',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaUsersComponent{
  users: any;
  dtOptions: Config = {}; // Cambia de Config a DataTables.Settings
  dtTrigger: Subject<any> = new Subject();
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        processing: "Procesando...",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        emptyTable: "Ningún dato disponible en esta tabla",
        infoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior"
        },
        info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
      }
    };

    this.userService.obtengoAllUsersApi().subscribe({
      next: (resultado) => {
        if (Array.isArray(resultado)) {
          this.users = resultado; // Asigna la lista de usuarios
        } else {
          console.error('Error: la respuesta no es un array válido', resultado);
        }
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      },
      complete: () => {
        console.log('Operación completada');
      }
    });

  }
  
}
