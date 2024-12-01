import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffPatientInfoComponent } from './staff-patient-info.component';

describe('StaffPatientInfoComponent', () => {
  let component: StaffPatientInfoComponent;
  let fixture: ComponentFixture<StaffPatientInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffPatientInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffPatientInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
