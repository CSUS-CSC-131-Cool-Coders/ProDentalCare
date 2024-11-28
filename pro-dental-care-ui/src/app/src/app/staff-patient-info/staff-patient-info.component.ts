import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-staff-patient-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './staff-patient-info.component.html',
  styleUrls: ['./staff-patient-info.component.css']
})
export class StaffPatientInfoComponent {

}
