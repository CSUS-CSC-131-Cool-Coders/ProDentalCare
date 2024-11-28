import { Component } from '@angular/core';
import {StaffDashboardComponent} from "../staff-dashboard/staff-dashboard.component";

@Component({
  selector: 'app-calendar',
  standalone: true,
    imports: [
        StaffDashboardComponent
    ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {

}
