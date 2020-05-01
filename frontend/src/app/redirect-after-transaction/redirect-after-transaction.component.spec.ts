import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectAfterTransactionComponent } from './redirect-after-transaction.component';

describe('RedirectAfterTransactionComponent', () => {
  let component: RedirectAfterTransactionComponent;
  let fixture: ComponentFixture<RedirectAfterTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectAfterTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectAfterTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
