import { TestBed } from '@angular/core/testing';

import { ActivateServiceService } from './activate-service.service';

describe('ActivateServiceService', () => {
  let service: ActivateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
