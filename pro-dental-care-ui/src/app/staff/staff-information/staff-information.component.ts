import { Component } from '@angular/core';
import {StaffDashboardComponent} from "../staff-dashboard/staff-dashboard.component";

@Component({
  selector: 'app-staff-info',
  standalone: true,
    imports: [
        StaffDashboardComponent
    ],
  templateUrl: './staff-information.component.html',
  styleUrl: './staff-information.component.css'
})
export class StaffInformationComponent {
  constructor() {
  }

}
