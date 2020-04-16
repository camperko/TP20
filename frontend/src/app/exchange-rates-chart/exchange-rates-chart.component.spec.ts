import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRatesChartComponent } from './exchange-rates-chart.component';

describe('ExchangeRatesChartComponent', () => {
  let component: ExchangeRatesChartComponent;
  let fixture: ComponentFixture<ExchangeRatesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeRatesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRatesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
