import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-staff-patient-info',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './staff-patient-info.component.html',
  styleUrls: ['./staff-patient-info.component.css']
})


//need 


export class StaffPatientInfoComponent {
  expandedSection: number | null = null; // Track which section is expanded

  
  user1Name: string = 'Nick';
  user1Email: string = 'here@hot';
  user1PatientID: string = '12345';
  user1DOB: string = 'Today';
  user1Phone: string = '2093277987';

  user2Name: string = 'Nack';
  user2Email: string = 'exampleEmail@gmail.com';
  user2PatientID: string = '';
  user2DOB: string = '';
  user2Phone: string = '';

  user3Name: string = '';
  user3Email: string = '';
  user3PatientID: string = '';
  user3DOB: string = '';
  user3Phone: string = '';

  user4Name: string = '';
  user4Email: string = '';
  user4PatientID: string = '';
  user4DOB: string = '';
  user4Phone: string = '';


  toggleSection(index: number) {
    this.expandedSection = this.expandedSection === index ? -1 : index;
  }

  preventToggle(event: Event) {
    event.stopPropagation(); // Prevent section toggle when clicking inside the section
  }

  

  

}
