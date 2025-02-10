import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../Users';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UsersComponent {
  @ViewChild('userForm', { static: true }) userForm: NgForm | undefined;
  public useract: User = {correo: '', pass: '', nombre: '', activo: 0, id_rol: 2,};
  public titulo: string = 'Nuevo Comentario';
  public tipo: number = 0;
  public id: number = 0;
  public txtBtn: string = 'Guardar';
  public formularioCambiado: boolean = false;
  public inputChecked: boolean = false;

  constructor(private _aroute: ActivatedRoute, private _usersService: UserService, private _route: Router, private toastr: ToastrService) { }
  ngOnInit() {
    this.tipo = +this._aroute.snapshot.params['tipo'];
    this.id = +this._aroute.snapshot.params['id']; // Recibimos parámetro
    if (this.tipo == 1) {
      this.titulo = 'Modificar Usuario (' + this.id + ')';
      this.traeUsuario(this.id);
    } else if (this.tipo == 2) {
      this.titulo = 'Borrar Usuario (' + this.id + ')';
      this.txtBtn = 'BORRAR';
      this.traeUsuario(this.id);
    }
  }
  private traeUsuario(id: number) {
    this._usersService.obtengoUserApi(id).subscribe({
      next: (resultado) => {
        if (resultado) {
          this.useract = resultado;
          this.inputChecked = this.useract.activo == 1;
        } else {
          this.toastr.error('Error al obtener el usuario:', resultado);
        }
      },
      error: (error) => {
        this.toastr.error('Error al obtener el usuario:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      },
    });
  }
  guardaUser(): void {

  
    this.formularioCambiado = false;
  
    if (this.tipo === 0) {
      // Crear usuario
      this.useract.activo = this.inputChecked? 1 : 0; // Actualizamos el estado del usuario según el checkbox

      // Enviamos el nuevo usuario al API para crearlo en la base de datos
     
      this._usersService.crearUserApi(this.useract).subscribe({
        next: (resultado) => {
          if (resultado) {
            this.toastr.success("Usuario creado:", resultado);
            this._route.navigate(["/users"]); // Redirección corregida
          } else {
            this.toastr.error("Error al crear el usuario:", resultado);
          }
        },
        error: (error) => {
          this.toastr.error("Error al crear el usuario:", error.error?.errores || error);
        },
        complete: () => {
          this.toastr.success("Operación completada.");
        },
      });
    } else if (this.tipo === 1) {
      this.toastr.success(`Usuario modificado: ${this.id}`);
      // Modificar usuario
      this.useract.activo = this.inputChecked? 1 : 0;
      this._usersService.modificaUserApi(this.id, this.useract).subscribe({
        
        next: (resultado) => {
          if (resultado) {
            this.toastr.success("Usuario modificado:", resultado);
            this._route.navigate(["/users"]); // Redirección corregida
          } else {
            this.toastr.error("Error al modificar el usuario:", resultado);
          }
        },
        error: (error) => {
          this.toastr.error("Error al modificar el usuario:", error.error?.errores || error);
        },
        complete: () => {
          this.toastr.success("Operación completada.");
        },
      });
    }
  
    // this.toastr.success(`Usuario modificado: ${this.id}`);
      else if (this.tipo == 2) {
        this.useract.activo = this.inputChecked? 1 : 0;
        console.log(this.id);
        this._usersService.borraUserApi(this.id).subscribe({
          next: (resultado) => {
            if (resultado) {
              this.toastr.success('Valor eliminado:', resultado);
              this._route.navigate(['/users']);
            } else {
              this.toastr.error('Error al eliminar el usuario:', resultado);
            }
          },
          error: (error) => {
            this.toastr.error('Error al borrar el usuario:', error.error.errores);
          },
          complete: () => {
            this.toastr.success('Operación completada.');
          },
        });
      
    } else alert("El formulario tiene campos inválidos");
  }
  cambiado(): void {
    this.formularioCambiado = true;
  }
  // Método que será llamado por el guard
  canDeactivate(): boolean {
    if (this.formularioCambiado) {
      return confirm(
        'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?'
      );
    }
    return true;
  }
  cancelar(event: Event): void {
    event.preventDefault(); // Previene que el formulario intente enviarse
    this._route.navigate(['/users'], { queryParams: {} });
    }

}