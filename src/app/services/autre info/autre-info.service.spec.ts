import { TestBed } from '@angular/core/testing';

import { AutreInfoService } from './autre-info.service';

describe('AutreInfoService', () => {
  let service: AutreInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutreInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
