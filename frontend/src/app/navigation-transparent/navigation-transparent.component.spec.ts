import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTransparentComponent } from './navigation-transparent.component';

describe('NavigationTransparentComponent', () => {
  let component: NavigationTransparentComponent;
  let fixture: ComponentFixture<NavigationTransparentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationTransparentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationTransparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
