import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export const incidenciaGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _loginService = inject(LoginService);
  //se controla que si es un usuario simple no pueda acceder al listado de incidencias ni ha editar o borrar
  if (_loginService.isUsuarioSimple()) {
    return _router.navigateByUrl('/bienvenido');
  }
  return true;
};
