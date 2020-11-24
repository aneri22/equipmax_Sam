import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradelicenseComponent } from './upgradelicense.component';

describe('UpgradelicenseComponent', () => {
  let component: UpgradelicenseComponent;
  let fixture: ComponentFixture<UpgradelicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradelicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradelicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
