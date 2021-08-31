import { TestBed } from '@angular/core/testing';

import { ServiceRetiro } from './service.retiro';

describe('ServiceRetiro', () => {
  let service: ServiceRetiro;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRetiro);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
