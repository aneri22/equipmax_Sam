import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftwareSuiteComponent } from './add-software-suite.component';

describe('AddSoftwareSuiteComponent', () => {
  let component: AddSoftwareSuiteComponent;
  let fixture: ComponentFixture<AddSoftwareSuiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoftwareSuiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoftwareSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
