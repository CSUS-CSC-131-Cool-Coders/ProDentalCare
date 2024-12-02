import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPatientInfoPage2Component } from './staff-patient-info-page2.component';

describe('StaffPatientInfoPage2Component', () => {
  let component: StaffPatientInfoPage2Component;
  let fixture: ComponentFixture<StaffPatientInfoPage2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffPatientInfoPage2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPatientInfoPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
