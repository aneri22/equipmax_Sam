import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensetableComponent } from './licensetable.component';

describe('LicensetableComponent', () => {
  let component: LicensetableComponent;
  let fixture: ComponentFixture<LicensetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicensetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicensetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
