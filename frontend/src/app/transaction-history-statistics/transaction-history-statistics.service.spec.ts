import { TestBed } from '@angular/core/testing';

import { TransactionHistoryStatisticsService } from './transaction-history-statistics.service';

describe('TransactionHistoryStatisticsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionHistoryStatisticsService = TestBed.get(TransactionHistoryStatisticsService);
    expect(service).toBeTruthy();
  });
});
