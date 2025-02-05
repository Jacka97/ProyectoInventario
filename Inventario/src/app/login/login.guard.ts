import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const _router = inject(Router);
  const _loginService = inject(LoginService);
  if (!_loginService.estaIdentificado()) {
    return _router.navigateByUrl('/login');
  }
  return true;
};