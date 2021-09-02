import { TestBed } from '@angular/core/testing';

import { ServiceDeposito } from './service.deposito';

describe('ServiceDeposito', () => {
  let service: ServiceDeposito;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDeposito);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
