import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistorySummaryComponent } from './transaction-history-summary.component';

describe('TransactionHistorySummaryComponent', () => {
  let component: TransactionHistorySummaryComponent;
  let fixture: ComponentFixture<TransactionHistorySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionHistorySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistorySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
