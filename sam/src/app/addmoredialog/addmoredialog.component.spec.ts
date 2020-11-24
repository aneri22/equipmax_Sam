import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmoredialogComponent } from './addmoredialog.component';

describe('AddmoredialogComponent', () => {
  let component: AddmoredialogComponent;
  let fixture: ComponentFixture<AddmoredialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmoredialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmoredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
