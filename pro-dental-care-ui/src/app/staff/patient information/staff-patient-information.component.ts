import {Component, Input, OnInit} from '@angular/core';
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
      this.newAllergies = [];
    }
  
    // Medications Methods
    addMedication(): void {
      this.newMedications.push({ date: '', medication: '', directions: '' });
    }
    saveNewMedications(): void {
      this.newMedications = [];
    }
  
    // Labs Methods
    addLab(): void {
      this.newLabs.push({ date: '', lab: '', comment: '' });
    }
    saveNewLabs(): void {
      this.newLabs = [];
    }
  
    // Immunizations Methods
    addImmunization(): void {
      this.newImmunizations.push({ date: '', immunization: '' });
    }
    saveNewImmunizations(): void {
      this.newImmunizations = [];
    }

      // To Do Methods
    addToDo(): void {
      this.newToDos.push({ note: '', provider: '', date: '' });
    }
    saveNewToDos(): void {
      this.newToDos = [];
    }

    saveNewTreatmentPlan(): void {
        let body = this.treatmentPlan;
      this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/treatment-plan", body).subscribe({
          next: res => {}
      })
    }
  }