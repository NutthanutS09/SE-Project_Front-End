import { TestBed } from '@angular/core/testing';

import { RegisService } from './regis.service';

describe('RegisService', () => {
  let service: RegisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
