import { TestBed } from '@angular/core/testing';

import { DispositivosRedService } from './dispositivos-red.service';

describe('DispositivosRedService', () => {
  let service: DispositivosRedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispositivosRedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
