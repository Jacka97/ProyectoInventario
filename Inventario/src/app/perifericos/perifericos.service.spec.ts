import { TestBed } from '@angular/core/testing';

import { PeriService } from './perifericos.service';

describe('PerifericosService', () => {
  let service: PeriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
