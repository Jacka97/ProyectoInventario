import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Guardar el rol del usuario en localStorage
  saveRole(role: number): void {
    sessionStorage.setItem('Rol', role.toString());
  }

  // Obtener el rol del usuario desde localStorage
  getRole(): number {
    return parseInt(sessionStorage.getItem('Rol') || '0', 10);
  }

  // Verificar si el usuario tiene acceso (ej. solo admin puede acceder)
  hasAdminAccess(): boolean {
    const role = this.getRole();
    return role === 1;  // 1 es el rol de administrador
  }

  // Verificar si el usuario tiene acceso a algo basado en su rol
  hasAccessToUsers(): boolean {
    const role = this.getRole();
    return role === 1;  // Solo el admin puede ver la pestaña de usuarios
  }
}
