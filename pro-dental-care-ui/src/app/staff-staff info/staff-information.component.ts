import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../api.service';

interface StaffInfo {
  fullName: string;
  position: string;
  staff_id: string;
  dateOfBirth: string;
  sex: string;
  payRate: string;
}

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class StaffInformationComponent implements OnInit {
  expandedSection: number | null = null; // Track which section is expanded

  staffInfo: StaffInfo = {
    fullName: '',
    position: '',
    staff_id: '',
    dateOfBirth: '',
    sex: '',
    payRate: '',
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.checkAccess('staff', '/staff-information');
    this.apiService.get('/staff/staff-information').subscribe({
      next: (res: any) => {
        const body = res.body;
        if (body && body.staffInfo) {
          this.staffInfo = body.staffInfo;
        }
      },
      error: (err) => {
        console.error('Failed to fetch staff information:', err);
      },
    });
  }

  toggleSection(index: number): void {
    this.expandedSection = this.expandedSection === index ? null : index;
  }

  preventToggle(event: Event): void {
    event.stopPropagation();
  }
}
