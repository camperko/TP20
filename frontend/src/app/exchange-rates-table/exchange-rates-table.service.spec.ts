import { TestBed } from '@angular/core/testing';

import { ExchangeRatesTableService } from './exchange-rates-table.service';

describe('ExchangeRatesTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangeRatesTableService = TestBed.get(ExchangeRatesTableService);
    expect(service).toBeTruthy();
  });
});
