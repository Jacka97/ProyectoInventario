import { TestBed } from '@angular/core/testing';

import { SoftwarePcService } from './software-pc.service';

describe('SoftwarePcService', () => {
  let service: SoftwarePcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwarePcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
