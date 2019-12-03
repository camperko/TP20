import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSellerComponent } from './navigation-seller.component';

describe('NavigationSellerComponent', () => {
  let component: NavigationSellerComponent;
  let fixture: ComponentFixture<NavigationSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
