import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-staff-patient-info',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './staff-patient-info.component.html',
  styleUrls: ['./staff-patient-info.component.css']
})
export class StaffPatientInfoComponent implements OnInit {
  expandedSection: number | null = null; // Track which section is expanded

  emailValid: boolean = true;

  user1Name: string;
  user1Email: string;
  user1PatientID: string;
  user1DOB: string;
  user1Phone: string;

  user2Name: string;
  user2Email: string;
  user2PatientID: string;
  user2DOB: string;
  user2Phone: string;

  user3Name: string;
  user3Email: string;
  user3PatientID: string;
  user3DOB: string;
  user3Phone: string;

  user4Name: string;
  user4Email: string;
  user4PatientID: string;
  user4DOB: string;
  user4Phone: string;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.checkAccess("patient-info-staff-view", "/patient-info");

    this.apiService.get("/patient-info-staff-view/patient-info").subscribe({
      next: res => {
        let body: any = res.body;
        this.user1Name = body[0].patientName;
        this.user1Email = body[0].email;
        this.user1PatientID = body[0].patientId;
        this.user1DOB = body[0].dateOfBirth;
        this.user1Phone = body[0].phoneNumber;

        this.user2Name = body[1].patientName;
        this.user2Email = body[1].email;
        this.user2PatientID = body[1].patientId;
        this.user2DOB = body[1].dateOfBirth;
        this.user2Phone = body[1].phoneNumber;

        this.user3Name = body[2].patientName;
        this.user3Email = body[2].email;
        this.user3PatientID = body[2].patientId;
        this.user3DOB = body[2].dateOfBirth;
        this.user3Phone = body[2].phoneNumber;

        this.user4Name = body[3].patientName;
        this.user4Email = body[3].email;
        this.user4PatientID = body[3].patientId;
        this.user4DOB = body[3].dateOfBirth;
        this.user4Phone = body[3].phoneNumber;
      },
      error: err => {
        console.error('Failed to fetch patient information:', err);
      }
    });
  }

  toggleSection(index: number) {
    this.expandedSection = this.expandedSection === index ? null : index;
  }

  preventToggle(event: Event) {
    event.stopPropagation(); // Prevent section toggle when clicking inside the section
  }

}
