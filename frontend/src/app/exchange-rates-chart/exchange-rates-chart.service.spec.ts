import { TestBed } from '@angular/core/testing';

import { ExchangeRatesChartService } from './exchange-rates-chart.service';

describe('ExchangeRatesChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangeRatesChartService = TestBed.get(ExchangeRatesChartService);
    expect(service).toBeTruthy();
  });
});
