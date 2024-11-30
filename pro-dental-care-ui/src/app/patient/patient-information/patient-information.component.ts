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
        this.contactInfo = body.contactInfo;
        this.basicInfo = body.basicInfo;
        this.emergencyContactInfo = body.emergencyContactInfo;
        this.addressInfo = body.addressInfo;
      },
      error: (err) => {
        console.error('Failed to fetch patient information:', err);
      },
    });
  }

  toggleSection(index: number): void {
    this.expandedSection = this.expandedSection === index ? null : index;
  }

  preventToggle(event: Event): void {
    event.stopPropagation();
  }

  validateEmail(): void {
    this.emailValid = this.validationService.validateEmail(this.contactInfo.contactEmail);
  }

  validateEmergencyEmail(): void {
    this.emergencyEmailValid = this.validationService.validateEmail(
      this.emergencyContactInfo.emergencyContactEmail
    );
  }

  enableEdit(event: Event): void {
    event.stopPropagation();
    this.editMode = true;
  }

  saveButton(event: Event): void {
    event.stopPropagation();

    // todo: check if the emails been updated, then validate if not, run through - otherwise save-button bricks here
    // Validate email fields
    // this.validateEmail();
    // this.validateEmergencyEmail();
    //
    // if (!this.emailValid || !this.emergencyEmailValid) {
    //   console.error('Email validation failed. Aborting save operation.');
    //   return;
    // }

    // Prepare the payload for the API
    const updatedData = {
      basicInfo: this.basicInfo,
      contactInfo: this.contactInfo,
      emergencyContactInfo: this.emergencyContactInfo,
      addressInfo: this.addressInfo,
    };

    // Call the API to save the updated data
    this.apiService.put('/patient/info', updatedData).subscribe({
      next: (res) => {
        console.log('Patient information updated successfully:', res);
        this.editMode = false; // Exit edit mode on success
      },
      error: (err) => {
        console.error('Failed to update patient information:', err);
        alert('An error occurred while saving. Please try again.');
      },
    });
  }

  cancelButton(event: Event): void {
    event.stopPropagation();
    this.editMode = false;
    // Optionally re-fetch the original data to discard changes
    this.ngOnInit();
  }
}
