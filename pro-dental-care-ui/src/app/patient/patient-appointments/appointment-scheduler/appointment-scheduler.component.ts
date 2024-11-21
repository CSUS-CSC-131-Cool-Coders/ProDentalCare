import { Component } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-appointment-scheduler',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './appointment-scheduler.component.html',
  styleUrl: './appointment-scheduler.component.css'
})
export class AppointmentSchedulerComponent {


}
