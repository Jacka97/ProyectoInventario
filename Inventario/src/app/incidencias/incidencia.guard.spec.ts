import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { incidenciaGuard } from './incidencia.guard';

describe('incidenciaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => incidenciaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
