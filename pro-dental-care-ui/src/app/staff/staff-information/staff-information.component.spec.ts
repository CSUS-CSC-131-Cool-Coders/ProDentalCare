import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInformationComponent } from './staff-information.component';

describe('StaffInfoComponent', () => {
  let component: StaffInformationComponent;
  let fixture: ComponentFixture<StaffInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
