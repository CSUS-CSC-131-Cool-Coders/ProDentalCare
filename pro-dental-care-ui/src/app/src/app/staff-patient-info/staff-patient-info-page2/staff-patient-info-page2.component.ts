import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-staff-patient-info-page2',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './staff-patient-info-page2.component.html',
  styleUrls: ['./staff-patient-info-page2.component.css']
})
export class StaffPatientInfoPage2Component {

  treatment: string = '';
  date: string = '';
  allergy: string = '';
  comment: string = '';
  prescription: string = '';
  medicationDate: string = '';
  directions: string = '';
  labDate: string = '';
  labs: string = '';
  labComments: string = '';
  immunizationDate: string = '';
  immunizationEvent: string = '';

  expandedSection: number = -1; 
  toggleSection(sectionIndex: number) {
    this.expandedSection = this.expandedSection === sectionIndex ? -1 : sectionIndex;
  }
  preventToggle(event: Event) {
    event.stopPropagation();
  }

  /*
  I think this is the stuff to connect it to the backend, not enitrely sure tbh
  ngOnInit() {
    // Simulate fetching data from a service or database
    this.dataService.getTreatmentPlanData().subscribe(data => {
      this.treatment = data.treatment || '';
      this.date = data.date || '';
      this.allergy = data.allergy || '';
      this.comment = data.comment || '';
      this.prescription = data.prescription || '';
      this.medicationDate = data.medicationDate || '';
      this.directions = data.directions || '';
      this.labDate = data.labDate || '';
      this.labs = data.labs || '';
      this.labComments = data.labComments || '';
      this.immunizationDate = data.immunizationDate || '';
      this.immunizationEvent = data.immunizationEvent || '';
    });
  }
    */
}