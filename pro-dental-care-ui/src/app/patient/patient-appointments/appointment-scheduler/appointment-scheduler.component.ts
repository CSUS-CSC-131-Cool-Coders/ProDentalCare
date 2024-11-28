import { Component , signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Staff } from '../../../admin/staff-information/staff-model';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar
// import {EventImpl} from '@fullcalendar/core/internal';



@Component({
  selector: 'appointment-scheduler',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule, MatSnackBarModule],
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
  selectedAppointment: EventApi | null = null;

  constructor(private changeDetector: ChangeDetectorRef, private snackBar: MatSnackBar) {
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    // Check if selected date is available and not in the past
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    // Set time to 00:00:00 for accurate comparison
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.snackBar.open('Cannot book an appointment on the selected date.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top', // We'll override this in CSS
        panelClass: ['snackbar-error', 'custom-snackbar']
      });
      return; // Exit the function early
    }

    this.selected = selectInfo;
    this.selectedDate = selectInfo.startStr; // Set the selected date
    // Clear existing selections if any
    this.selectedDentist = '';
    this.selectedTime = '';

    // Clear any selected appointment details
    this.selectedAppointment = null;


  }

  handleEventClick(clickInfo: EventClickArg) {

    // Set the selected appointment to display details
    this.selectedAppointment = clickInfo.event;
    if (this.selectedDate) {
      this.selectedDate = null;
    }
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  // Select Appointment from Sidebar
  selectAppointment(appointment: EventApi) {
    this.selectedAppointment = appointment;
    // If a date is selected, clear it to hide appointment lists
    if (this.selectedDate) {
      this.selectedDate = null;
    }
  }

  // Close the appointment details view
  closeAppointmentDetails() {
    this.selectedAppointment = null;
  }

  // Cancel Appointment Method
  cancelAppointment(appointment: EventApi) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      appointment.remove(); // Removes the event from the calendar

      // Show cancellation snackbar
      this.snackBar.open('Appointment cancelled successfully!', 'Close', {
        duration: 9000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar']
      });

      // Clear selected appointment details
      this.selectedAppointment = null;
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
        start: this.selectedDate +'T'+ this.convertTimeTo24(this.selectedTime),
        allDay: false,
        display: 'block',
        extendedProps: {
          dentist: this.selectedDentist,
          time: this.selectedTime,
          dentistNotes: null,
        },
      });

      // Show success snackbar
      this.snackBar.open('Appointment booked successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });

      // Reset selections
      calendarApi.unselect(); // clear date selection

      this.selectedDate = null;
      this.selectedDentist = '';
      this.selectedTime = '';
    } else {
      this.snackBar.open('Please select Dentist or Time', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success']
      });
    }
  }

// Utility to convert 12-hour time to 24-hour format with seconds
  convertTimeTo24(time: string): string {
    const [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':');

    // Convert hours based on AM/PM
    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    // Ensure hours and minutes are two digits
    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    // Append seconds
    const seconds = '00';

    return `${hours}:${minutes}:${seconds}`;
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

  // Leave a Review Method
  leaveReview(appointment: EventApi) {
    // Placeholder action: Show a snackbar
    this.snackBar.open('Redirecting to review form...', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });

    // TODO: Implement actual review functionality
    // For example, navigate to a review component or open a dialog
    /*
    this.dialog.open(ReviewDialogComponent, {
      data: { appointmentId: appointment.id }
    });
    */
  }
}
