import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-staff-patient-information',
  templateUrl: './staff-patient-information.component.html',
  styleUrls: ['./staff-patient-information.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage],
})
export class StaffPatientInformationComponent implements OnInit {
  patientId: string | null = null;
  patientName: string = '';

  visitsExpanded = false;
  allergiesExpanded = false;
  medsExpanded = false;
  labsExpanded = false;
  immunizationsExpanded = false;

  // placeholder data; connect it to the api (i made entities and apis for these)
  visits = [
    { date: '12/12/2024', provider: 'Dr. Emily White', notes: 'Regular cleaning, no major issues.' },
    { date: '06/15/2024', provider: 'Dr. John Doe', notes: 'Follow-up visit for root canal treatment.' },
  ];

  allergies = [
    { name: 'Peanuts', comment: 'Severe reaction, carry epinephrine.' },
    { name: 'Penicillin', comment: 'Mild rash, avoid use.' },
  ];

  medications = [
    { datePrescribed: '01/10/2024', name: 'Ibuprofen', directions: 'Take 1 tablet every 4-6 hours as needed.' },
    { datePrescribed: '11/15/2023', name: 'Amoxicillin', directions: 'Take 1 capsule twice a day for 10 days.' },
  ];

  labs = [
    { date: '11/01/2024', name: 'Blood Test', comments: 'Normal results, no action required.' },
    { date: '09/05/2024', name: 'Chest X-ray', comments: 'Clear, no abnormalities detected.' },
  ];

  immunizations = [
    { date: '10/15/2024', name: 'Flu Vaccine' },
    { date: '08/01/2023', name: 'Tetanus Booster' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id');
    this.patientName = this.getPatientNameById(this.patientId);
  }

  getPatientNameById(patientId: string | null): string {
    const patients: Record<string, string> = {
      P001: 'John Doe',
      P002: 'Jane Smith',
      P003: 'Alice Brown',
    };

    return patients[patientId || ''] || 'Unknown Patient';
  }
}
