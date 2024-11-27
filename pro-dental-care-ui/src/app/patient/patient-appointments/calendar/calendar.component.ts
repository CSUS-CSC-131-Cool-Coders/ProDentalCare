import { Component, Input, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput, DateSelectArg, DayCellContentArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AppointmentService } from '../../services/appointment.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppointmentModalComponent } from '../appointment-modal/appointment-modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    MatDialogModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    selectMirror: true,
    plugins: [dayGridPlugin, interactionPlugin],
    select: this.handleDateSelect.bind(this),
    events: [
      { title: 'event 1', date: '2024-11-01' },
      { title: 'event 2', date: '2024-11-26' }
    ],
    dayCellClassNames: this.getDayClass.bind(this),
  };

  availableDates: string[] = [];

  constructor(private appointmentService: AppointmentService, private dialog: MatDialog) {}

  ngOnInit() {
    this.availableDates = this.appointmentService.getAvailableDates();
    this.calendarOptions.events = this.appointmentService.getCalendarEvents();
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dateStr = selectInfo.endStr;
    if (this.availableDates.includes(dateStr)) {
      this.dialog.open(AppointmentModalComponent, {
        data: { date: dateStr },
      }).afterClosed().subscribe(() => {
        // Refresh events after booking
        this.calendarOptions.events = this.appointmentService.getCalendarEvents();
      });
    } else {
      alert('No dentists available on this date.');
    }
  }

  getDayClass(arg: DayCellContentArg): string[] {
    const dateStr = arg.date.toISOString().split('T')[0];
    if (this.availableDates.includes(dateStr)) {
      return ['available-date'];
    } else {
      return ['unavailable-date'];
    }
  }
}
