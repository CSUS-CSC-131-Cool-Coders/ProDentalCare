import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-patient-information',
  templateUrl: './staff-patient-information.component.html',
  styleUrls: ['./staff-patient-information.component.css'],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage, FormsModule],
})
export class StaffPatientInformationComponent implements OnInit {
    patientId: string | null = null;
    patientName: string = '';
  
    // Accordion State
    visitsExpanded = false;
    allergiesExpanded = false;
    medsExpanded = false;
    labsExpanded = false;
    immunizationsExpanded = false;
    toDoExpanded = false;
    treatmentPlanExpanded = false;
  
    // placeholder data !! Suppose to pull from database!! -- look at tims code lowkey
    visits = [
      { date: '12/12/2024', provider: 'Dr. Emily White', notes: 'Regular cleaning.' },
      { date: '06/15/2024', provider: 'Dr. John Doe', notes: 'Follow-up visit.' },
    ];
    allergies = [
      { name: 'Peanuts', comment: 'Severe reaction.' },
      { name: 'Penicillin', comment: 'Mild rash.' },
    ];
    medications = [
      { datePrescribed: '01/10/2024', name: 'Ibuprofen', directions: 'Take 1 tablet every 4-6 hours.' },
      { datePrescribed: '11/15/2023', name: 'Amoxicillin', directions: 'Take 1 capsule twice daily.' },
    ];
    labs = [
      { date: '11/01/2024', name: 'Blood Test', comments: 'Normal results.' },
      { date: '09/05/2024', name: 'X-ray', comments: 'No abnormalities.' },
    ];
    immunizations = [
      { date: '10/15/2024', name: 'Flu Vaccine' },
      { date: '08/01/2023', name: 'Tetanus Booster' },
    ];
    toDos = [
      { note: 'Complete cleaning', provider: 'John Smith', date: '01/15/2024' },
      { note: 'Schedule crown procedure', provider: 'Jane Doe', date: '03/20/2024' },
    ];
    treatmentPlans = [
      { plan: 'Orthodontic Alignment', provider: 'John Smith', start: '01/10/2024', end: '12/10/2024' },
      { plan: 'Cavity Filling', provider: 'Jane Doe', start: '02/01/2024', end: '02/15/2024' },
    ];
  
    // empty arrays for new data
    newVisits: { date: string; provider: string; notes: string }[] = [];
    newAllergies: { name: string; comment: string }[] = [];
    newMedications: { datePrescribed: string; name: string; directions: string }[] = [];
    newLabs: { date: string; name: string; comments: string }[] = [];
    newImmunizations: { date: string; name: string }[] = [];
    newToDos: { note: string; provider: string; date: string }[] = [];
    newTreatmentPlans: { plan: string; provider: string; start: string; end: string }[] = [];

  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.patientId = this.route.snapshot.paramMap.get('id');
      this.patientName = `Patient ${this.patientId}`; // itll show selected patient id from patient list; try to make it show name instead of ID (if not, should be okay)
    }
  
    // These are methods to push into database, not sure how u gonna do that -- ask caleb

    // Visits methods
    addVisit(): void {
      this.newVisits.push({ date: '', provider: '', notes: '' });
    }
    saveNewVisits(): void {
      this.visits.push(...this.newVisits);
      this.newVisits = [];
    }
  
    // Allergies Methods
    addAllergy(): void {
      this.newAllergies.push({ name: '', comment: '' });
    }
    saveNewAllergies(): void {
      this.allergies.push(...this.newAllergies);
      this.newAllergies = [];
    }
  
    // Medications Methods
    addMedication(): void {
      this.newMedications.push({ datePrescribed: '', name: '', directions: '' });
    }
    saveNewMedications(): void {
      this.medications.push(...this.newMedications);
      this.newMedications = [];
    }
  
    // Labs Methods
    addLab(): void {
      this.newLabs.push({ date: '', name: '', comments: '' });
    }
    saveNewLabs(): void {
      this.labs.push(...this.newLabs);
      this.newLabs = [];
    }
  
    // Immunizations Methods
    addImmunization(): void {
      this.newImmunizations.push({ date: '', name: '' });
    }
    saveNewImmunizations(): void {
      this.immunizations.push(...this.newImmunizations);
      this.newImmunizations = [];
    }

      // To Do Methods
    addToDo(): void {
      this.newToDos.push({ note: '', provider: '', date: '' });
    }
    saveNewToDos(): void {
      this.toDos.push(...this.newToDos);
      this.newToDos = [];
    }

    // Treatment Plan Methods
    addTreatmentPlan(): void {
      this.newTreatmentPlans.push({ plan: '', provider: '', start: '', end: '' });
    }
    saveNewTreatmentPlans(): void {
      this.treatmentPlans.push(...this.newTreatmentPlans);
      this.newTreatmentPlans = [];
    }
  }