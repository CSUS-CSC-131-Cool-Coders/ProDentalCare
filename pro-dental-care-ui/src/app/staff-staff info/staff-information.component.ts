import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class StaffInformationComponent implements OnInit {
  staffInfo: any = {
    name: '',
    title: '',
    supervisor: '',
    staffId: '',
    employmentType: '',
    payRate: '',
    yearsOfService: 0,
  };

  constructor() {}

  ngOnInit(): void {
    // Initialize staff information
    this.staffInfo = {
      name: 'Jane Doe',
      title: 'Nurse',
      supervisor: 'Dr. Smith',
      staffId: 'ST12345',
      employmentType: 'Full-Time',
      payRate: '40',
      yearsOfService: 5,
    };
  }
}
