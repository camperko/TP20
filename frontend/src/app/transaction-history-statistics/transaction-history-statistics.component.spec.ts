import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryStatisticsComponent } from './transaction-history-statistics.component';

describe('TransactionHistoryStatisticsComponent', () => {
  let component: TransactionHistoryStatisticsComponent;
  let fixture: ComponentFixture<TransactionHistoryStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionHistoryStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionHistoryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
