import {Component, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";
import { FormsModule } from '@angular/forms';
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-staff-patient-information',
  templateUrl: './staff-patient-information.component.html',
  styleUrls: ['./staff-patient-information.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage, FormsModule],
})
export class StaffPatientInformationComponent implements OnInit {

    public patientInfo: any;

    @Input()
    public treatmentPlan: {planName: string, staffId: string, startDate: string, endDate: string};

    @Input()
    public treatmentPlanName: string;

    @Input()
    public treatmentPlanStaffId: string;

    @Input()
    public treatmentPlanStartDate: string;

    @Input()
    public treatmentPlanEndDate: string;


    // Accordion State
    visitsExpanded = false;
    allergiesExpanded = false;
    medsExpanded = false;
    labsExpanded = false;
    immunizationsExpanded = false;
    toDoExpanded = false;
    treatmentPlanExpanded = false;
  
    // empty arrays for new data
    newVisits: { date: string; provider: string; dentistNotes: string }[] = [];
    newAllergies: { allergy: string; comment: string }[] = [];
    newMedications: { date: string; medication: string; directions: string }[] = [];
    newLabs: { date: string; lab: string; comment: string }[] = [];
    newImmunizations: { date: string; immunization: string }[] = [];
    newToDos: { note: string; provider: string; date: string }[] = [];
    newTreatmentPlans: { plan: string; provider: string; start: string; end: string }[] = [];

  
    constructor(private route: ActivatedRoute, private apiService: ApiService) {}
  
    ngOnInit(): void {
      let patientId = this.route.snapshot.paramMap.get('id');
      this.apiService.get("/staff/patient-information/" + patientId).subscribe({
          next: res => {
              if (!ApiService.isOk(res.status)) {
                  // fail silently
                  return;
              }

              this.patientInfo = res.body;
              if (this.patientInfo.patientTreatmentPlan != null) {
                  this.treatmentPlan = {
                      planName: this.patientInfo.patientTreatmentPlan.planName,
                      staffId: this.patientInfo.patientTreatmentPlan.staffId,
                      startDate: this.patientInfo.patientTreatmentPlan.startDate,
                      endDate: this.patientInfo.patientTreatmentPlan.endDate
                  };
              } else {
                  this.treatmentPlan = {
                      planName: '',
                      staffId: '',
                      startDate: '',
                      endDate: ''
                  };
              }
          }
      });
    }
  
    // These are methods to push into database, not sure how u gonna do that -- ask caleb

    // Visits methods
    addVisit(): void {
      this.newVisits.push({ date: '', provider: '', dentistNotes: '' });
    }
    saveNewVisits(): void {
      this.newVisits = [];
    }
  
    // Allergies Methods
    addAllergy(): void {
      this.newAllergies.push({ allergy: '', comment: '' });
    }
    saveNewAllergies(): void {
        let body = this.newAllergies;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/allergies", body).subscribe({
            next: res => {
                if (ApiService.isOk(res.status)) {
                    if (this.patientInfo.allergies == null) {
                        this.patientInfo.allergies = [];
                    }
                    for (let allergy of this.newAllergies) {
                        this.patientInfo.allergies.push(allergy);
                    }
                }

                this.newAllergies = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
                this.newAllergies = [];
            }
        });


    }
  
    // Medications Methods
    addMedication(): void {
      this.newMedications.push({ date: '', medication: '', directions: '' });
    }
    saveNewMedications(): void {
        let body = this.newMedications;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/medications", body).subscribe({
            next: res => {
                if (ApiService.isOk(res.status)) {
                    if (this.patientInfo.medications == null) {
                        this.patientInfo.medications = [];
                    }
                    for (let medication of this.newMedications) {
                        this.patientInfo.medications.push(medication);
                    }
                }

                this.newMedications = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
                this.newMedications = [];
            }
        });
    }
  
    // Labs Methods
    addLab(): void {
      this.newLabs.push({ date: '', lab: '', comment: '' });
    }
    saveNewLabs(): void {
        let body = this.newLabs;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/labs", body).subscribe({
            next: res => {
                if (ApiService.isOk(res.status)) {
                    if (this.patientInfo.labs == null) {
                        this.patientInfo.labs = [];
                    }
                    for (let lab of this.newLabs) {
                        this.patientInfo.labs.push(lab);
                    }
                }

                this.newLabs = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
                this.newLabs = [];
            }
        });
    }
  
    // Immunizations Methods
    addImmunization(): void {
      this.newImmunizations.push({ date: '', immunization: '' });
    }
    saveNewImmunizations(): void {
        let body = this.newImmunizations;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/immunizations", body).subscribe({
            next: res => {
                if (ApiService.isOk(res.status)) {
                    if (this.patientInfo.immunizations == null) {
                        this.patientInfo.immunizations = [];
                    }
                    for (let immunization of this.newImmunizations) {
                        this.patientInfo.immunizations.push(immunization);
                    }
                }

                this.newImmunizations = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
                this.newImmunizations = [];
            }
        });
    }

    saveNewTreatmentPlan(): void {
        let body = this.treatmentPlan;
      this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/treatment-plan", body).subscribe({
          next: res => {}
      })
    }
  }