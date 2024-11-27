import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Staff } from '../../../admin/staff-information/staff-model';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'appointment-scheduler',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule],
  templateUrl: './appointment-scheduler.component.html',
  styleUrl: './appointment-scheduler.component.css'
})
export class AppointmentSchedulerComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);
  upcomingAppointments = signal<EventApi[]>([]);
  pastAppointments = signal<EventApi[]>([]);

  staffs: Staff[] = [
    {
      id: 1,
      name: 'Jane Doe',
      position: 'Dentist',
      pay: '$150,000/year',
      yearsWorked: 12,
      email: "123JaneSmith@gmail.com",
      contactNumber: '1(916)123-4567',
      qualifications: ['DDS', 'Certified Invisalign Provider'],
      availability: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
    },
    {
      id: 2,
      name: 'John Smith',
      position: 'Hygienist',
      pay: '$90,0000/year',
      yearsWorked: 4,
      email: "99JohnS@gmail.com",
      contactNumber: '1(279)987-6543',
      qualifications: ['RDH', 'CDH'],
      availability: ['09:30 AM', '10:30 AM', '01:00 PM', '03:00 PM'],
    },
  ]

  // Selected dentist and time slot
  selectedDentist: string = '';
  selectedTime: string = '';
  selectedDate: string|null = '';
  selected: DateSelectArg;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    this.selected = selectInfo;
    this.selectedDate = selectInfo.startStr; // Set the selected date
    // Clear existing selections if any
    this.selectedDentist = '';
    this.selectedTime = '';

    calendarApi.unselect(); // clear date selection


  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError

    const today = new Date();

    const upcoming = events.filter(event => new Date(event.start!) >= today);
    const past = events.filter(event => new Date(event.start!) < today);

    this.upcomingAppointments.set(upcoming);
    this.pastAppointments.set(past);
  }

  bookAppointment() {
    const calendarApi = this.selected.view.calendar
    if (this.selectedDentist && this.selectedTime && this.selectedDate) {
      calendarApi.addEvent({
        id: createEventId(),
        title: `Appointment`,
        start: this.selectedDate,
        end: this.selectedDate,
        allDay: false
      });
      // Reset selections
      calendarApi.unselect(); // clear date selection

      this.selectedDate = null;
      this.selectedDentist = '';
      this.selectedTime = '';
    } else {
      alert('Please select both a dentist and a time slot.');
    }
  }

  // Utility to convert 12-hour time to 24-hour format
  convertTimeTo24(time: string): string {
    const [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':');
    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }
    return `${hours.padStart(2, '0')}:${minutes}`;
  }

  // Get available slots based on selected dentist
  getAvailableSlots(): string[] | undefined {
    const dentist = this.staffs.find(d => d.name === this.selectedDentist);
    return dentist ? dentist.availability : [];
  }

  // Cancel booking process
  cancelBooking() {
    this.selectedDate = null;
    this.selectedDentist = '';
    this.selectedTime = '';
  }
}
