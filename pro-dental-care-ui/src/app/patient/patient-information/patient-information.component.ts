import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ValidationService } from '../../validation.service';

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
export class PatientInformationComponent {
  expandedSection: number | null = null;
  editMode = false;

  // Initializing and setting these fields to default N/A rather than having placeholder constant here
  contactInfo = {
    phoneType: 'N/A',
    phoneNumber: 'N/A',
    contactEmail: 'N/A',
  };
  editContactInfo = { ...this.contactInfo };

  emergencyContactInfo = {
    relationship: 'N/A',
    phoneType: 'N/A',
    phoneNumber: 'N/A',
    emergencyContactEmail: 'N/A',
  };
  editEmergencyContactInfo = { ...this.emergencyContactInfo };

  basicInfo = {
    patientName: 'N/A',
    patientDOB: 'N/A',
    patientRace: 'N/A',
    patientSex: 'N/A',
    patientMaritalStatus: 'N/A',
    patientPrefLanguage: 'N/A',
    patientNumber: 'N/A',
    patientWeight: 'N/A',
    patientHeight: 'N/A',
  };
  editBasicInfo = { ...this.basicInfo };

  emailValid: boolean = true;
  emergencyEmailValid: boolean = true;

  addressInfo = {
    country: 'N/A',
    state: 'N/A',
    postalCode: 'N/A',
    city: 'N/A',
    addressLineOne: 'N/A',
    addressLineTwo: 'N/A',
  };
  editAddressInfo = { ...this.addressInfo };

  constructor(private validationService: ValidationService) {}

  toggleSection(index: number): void {
    this.expandedSection = this.expandedSection === index ? null : index;
  }

  preventToggle(event: Event): void {
    event.stopPropagation();
  }

  validateEmail(): void {
    this.emailValid = this.validationService.validateEmail(
      this.editContactInfo.contactEmail
    );
  }

  validateEmergencyEmail(): void {
    this.emergencyEmailValid = this.validationService.validateEmail(
      this.editEmergencyContactInfo.emergencyContactEmail
    );
  }

  enableEdit(event: Event): void {
    event.stopPropagation();
    this.editMode = true;
    this.editContactInfo = { ...this.contactInfo };
    this.editEmergencyContactInfo = { ...this.emergencyContactInfo };
    this.editBasicInfo = { ...this.basicInfo };
    this.editAddressInfo = { ...this.addressInfo};
  }

  saveButton(event: Event): void {
    event.stopPropagation();

    if (this.editContactInfo.contactEmail !== this.contactInfo.contactEmail) {
      this.validateEmail();
      if (!this.emailValid) return;
    }

    if (this.editEmergencyContactInfo.emergencyContactEmail !== this.emergencyContactInfo.emergencyContactEmail) {
      this.validateEmergencyEmail();
      if (!this.emergencyEmailValid) return;
    }

    this.contactInfo = { ...this.editContactInfo };
    this.emergencyContactInfo = { ...this.editEmergencyContactInfo };
    this.basicInfo = { ...this.editBasicInfo };
    this.addressInfo = { ...this.editAddressInfo};
    this.editMode = false;
  }

  cancelButton(event: Event): void {
    event.stopPropagation();
    this.editMode = false;
  }
}
