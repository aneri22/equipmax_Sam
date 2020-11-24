import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlicenseComponent } from './addlicense.component';

describe('AddlicenseComponent', () => {
  let component: AddlicenseComponent;
  let fixture: ComponentFixture<AddlicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddlicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddlicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
