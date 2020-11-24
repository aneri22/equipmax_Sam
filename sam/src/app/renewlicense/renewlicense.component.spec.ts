import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewlicenseComponent } from './renewlicense.component';

describe('RenewlicenseComponent', () => {
  let component: RenewlicenseComponent;
  let fixture: ComponentFixture<RenewlicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewlicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
