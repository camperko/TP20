import { TestBed } from '@angular/core/testing';

import { TransactionHistorySummaryService } from './transaction-history-summary.service';

describe('TransactionHistorySummaryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransactionHistorySummaryService = TestBed.get(TransactionHistorySummaryService);
    expect(service).toBeTruthy();
  });
});
