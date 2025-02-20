import { TestBed } from '@angular/core/testing';

import { MatsUbiService } from './mats-ubi.service';

describe('MatsUbiService', () => {
  let service: MatsUbiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatsUbiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
