import { CommonModule, NgIf, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage, FormsModule]
})
export class StaffInformationComponent implements OnInit {
  expandedSection: number | null = null;
  editMode = false;

  staffInfo: any = {
    title: '',
    supervisor: '',
    staffId: '',
    employmentType: '',
    payRate: '',
    yearsOfService: 0,
  };

  constructor() {}

  ngOnInit(): void {
    // place yo api shit in here
    this.staffInfo = [
      {
        name: "Jane Doe",
        title: 'Nurse',
        supervisor: 'Dr. Smith',
        staffId: 'ST12345',
        employmentType: 'Full-Time',
        payRate: '40',
        yearsOfService: 5,
      },
      {
        name: "Barbara Davis",
        title: 'Receptionist',
        supervisor: 'Ms. Johnson',
        staffId: 'ST54321',
        employmentType: 'Part-Time',
        payRate: '25',
        yearsOfService: 2,
      }
    ];
  }
  

  toggleSection(index: number): void {
    this.expandedSection = this.expandedSection === index ? null : index;
  }

  preventToggle(event: Event): void {
    event.stopPropagation();
  }

  enableEdit(event: Event): void {
    event.stopPropagation();
    this.editMode = true;
  }

  saveButton(event: Event): void {
    event.stopPropagation();
    // add api logic to save into db
    console.log('Staff information updated:', this.staffInfo);
    this.editMode = false; // Exit edit mode after saving
  }

  cancelButton(event: Event): void {
    event.stopPropagation();
    // Reset data or do something to cancel the edit
    console.log('Edit mode cancelled');
    this.editMode = false;

    // Resetting to initial values (for demo purposes, you can replace it with actual rollback logic)
    this.ngOnInit();
  }
}
