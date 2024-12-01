import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ValidationService } from '../../validation.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-patient-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgOptimizedImage,
  ],
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css'],
})
export class PatientInformationComponent implements OnInit {
  expandedSection: number | null = null;
  editMode = false;

  contactInfo: any = {};
  emergencyContactInfo: any = {};
  basicInfo: any = {};
  addressInfo: any = {};

  emailValid: boolean = true;
  emergencyEmailValid: boolean = true;

  constructor(private validationService: ValidationService, private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.checkAccess('patient', '/info');
    this.apiService.get('/patient/info').subscribe({
      next: (res: any) => {
        const body = res.body;
        if (body) {
          this.contactInfo = body.contactInfo || {};
          this.basicInfo = body.basicInfo || {};
          this.addressInfo = body.addressInfo || {};
        }
      },
      error: (err) => {
        console.error('Failed to fetch patient information:', err);
      },
    });

    this.apiService.checkAccess('patient', '/emergency-contact');
    this.apiService.get('/patient/emergency-contact').subscribe({
      next: (res: any) => {
        const body = res.body;
        if (body) {
          this.emergencyContactInfo = body.emergencyContactInfo || {};
        }
      },
      error: (err) => {
        console.error('Failed to fetch emergency contact information:', err);
      },
    });
  }

  toggleSection(index: number): void {
    this.expandedSection = this.expandedSection === index ? null : index;
  }

  preventToggle(event: Event): void {
    event.stopPropagation();
  }

  validateEmail(): boolean {
    this.emailValid = this.validationService.validateEmail(this.contactInfo.contactEmail || '');
    return this.emailValid;
  }

  validateEmergencyEmail(): boolean {
    this.emergencyEmailValid = this.validationService.validateEmail(
      this.emergencyContactInfo.emergencyContactEmail || ''
    );
    return this.emergencyEmailValid;
  }

  enableEdit(event: Event): void {
    event.stopPropagation();
    this.editMode = true;
  }

  saveButton(event: Event): void {
    event.stopPropagation();

    // Validate email fields
    const isEmailValid = this.validateEmail();
    const isEmergencyEmailValid = this.validateEmergencyEmail();

    if (!isEmailValid || !isEmergencyEmailValid) {
      console.error('Email validation failed. Aborting save operation.');
      alert('Invalid email format. Please correct and try again.');
      return;
    }

    // payload for UI
    const updatedData = {
      basicInfo: this.basicInfo,
      contactInfo: this.contactInfo,
      addressInfo: this.addressInfo,
    };

    // Calling the API to save the updated data for patient info
    this.apiService.put('/patient/info', updatedData).subscribe({
      next: (res) => {
        console.log('Patient information updated successfully:', res);
        this.editMode = false; // Exit edit mode on success
      },
      error: (err) => {
        console.error('Failed to update patient information:', err);
        alert('An error occurred while saving patient information. Please try again.');
      },
    });

    // Calling the API to save the updated data for emergency contact
    this.apiService.put('/patient/emergency-contact', { emergencyContactInfo: this.emergencyContactInfo }).subscribe({
      next: (res) => {
        console.log('Patient emergency contact information updated successfully:', res);
        this.editMode = false; // Exit edit mode on success
      },
      error: (err) => {
        console.error('Failed to update patient emergency contact information:', err);
        alert('An error occurred while saving emergency contact information. Please try again.');
      },
    });
  }

  cancelButton(event: Event): void {
    event.stopPropagation();
    this.editMode = false;

    this.ngOnInit();
  }
}
