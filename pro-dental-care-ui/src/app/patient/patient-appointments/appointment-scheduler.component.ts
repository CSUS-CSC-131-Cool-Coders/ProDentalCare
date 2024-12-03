import { Component, signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { createEventId } from './event-utils';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar

import { PatientAppointmentsResponse } from '../../models/patient-appointments-response'
import { AppointmentInfo, StaffInfo } from '../../models/appointment-info';
import { ApiService } from '../../api.service';
import { PatientStaffInfoResponse } from '../../models/patient-staff-info-response';

@Component({
  selector: 'appointment-scheduler',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule, MatSnackBarModule],
  templateUrl: './appointment-scheduler.component.html',
  styleUrl: './appointment-scheduler.component.css'
})
export class AppointmentSchedulerComponent implements OnInit{
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    initialView: 'dayGridMonth',
    events: [],
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
  };

  currentEvents = signal<EventApi[]>([]);
  upcomingAppointments = signal<EventApi[]>([]);
  pastAppointments = signal<EventApi[]>([]);


  // Selected dentist and time slot
  selectedDentist: string = '';
  selectedTime: string = '';
  selectedDate: string | null = '';
  selected: DateSelectArg;
  selectedAppointment: EventApi | null = null;
  appointments: AppointmentInfo[] = [];
  staffs: StaffInfo[] = [];
  errorMessage: string = '';
  patientId: string = '';


  constructor(
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchCalendarAppointments();
    this.fetchStaffInformation();
  }

  /**
   * Fetches calendar appointments from the backend API.
   */
  fetchCalendarAppointments(): void {
    this.errorMessage = '';

    this.apiService.get<PatientAppointmentsResponse>('/patient/appointments').subscribe({
      next: (res) => {
        if (res.body && res.status === 200) {
          this.appointments = res.body.appointments;
          this.populateCalendarEvents();
        } else {
          console.error('Unexpected response structure:', res);
          this.errorMessage = 'Unexpected response from the server.';
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      },
      error: (err) => {
        console.error('Error fetching calendar appointments:', err);
        this.errorMessage = 'Failed to load calendar appointments. Please try again later.';
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error', 'custom-snackbar'],
        });
      }
    });
  }

  /**
   * Fetches staff information from the backend API.
   */
  fetchStaffInformation(): void {
    this.apiService.get<PatientStaffInfoResponse>('/patient/appointments').subscribe({
      next: (res) => {
        if (res.body && res.status === 200) {
          this.staffs = res.body.staffMembers.map((staff: StaffInfo) => ({
            ...staff,
            name: `${staff.firstName} ${staff.lastName}`,
          }));
        } else {
          console.error('Unexpected staff information structure:', res);
          this.snackBar.open('Unexpected staff information from server.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      },
      error: (err) => {
        console.error('Error fetching staff information:', err);
        this.snackBar.open('Failed to load staff information.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error', 'custom-snackbar'],
        });
      }
    });
  }


  /**
   * Populates the calendar with fetched appointments.
   */
  populateCalendarEvents(): void {
    const formattedEvents = this.appointments.map((appt) => ({
      id: appt.appointmentId.toString(),
      title: `Appointment`,
      start: appt.date, // Ensure 'date' includes time if necessary
      end: appt.date, // Adjust end time if necessary
      extendedProps: {
        status: appt.status,
        dentistNotes: appt.dentistNotes,
        patientId: appt.patientId,
        staffMembers: this.getStaffNames(appt),
      },
    }));

    this.calendarOptions.events = formattedEvents;
  }

  getStaffNames(appt: AppointmentInfo): string {
    return appt.staffMembers.map(s => `${s.firstName} ${s.lastName}`).join(', ');
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
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar']
      });
      return; // Exit the function early
    }

    this.selectedDate = selectInfo.startStr;
    this.selectedAppointment = null;

  }


  handleEventClick(clickInfo: EventClickArg) {
    // Set the selected appointment to display details
    this.selectedAppointment = clickInfo.event;
    if (this.selectedDate) {
      this.selectedDate = null;
    }
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
      const appointmentId = appointment.id; // assuming id is the appointmentId as string
      this.apiService.delete(`/patient/appointments/${appointmentId}`, null).subscribe({
        next: () => {
          // Remove the event from the calendar
          appointment.remove();

          // Show cancellation snackbar
          this.snackBar.open('Appointment cancelled successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-success', 'custom-snackbar']
          });

          // Clear selected appointment details
          this.selectedAppointment = null;
        },
        error: (error) => {
          console.error('Error cancelling appointment:', error);
          this.snackBar.open('Failed to cancel appointment.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['snackbar-error', 'custom-snackbar']
          });
        }
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for ExpressionChangedAfterItHasBeenCheckedError

    const today = new Date();

    const upcoming = events.filter(event => new Date(event.start!) >= today);
    const past = events.filter(event => new Date(event.start!) < today);

    this.upcomingAppointments.set(upcoming);
    this.pastAppointments.set(past);
  }

  postAppointment() {
    let body = {
      date: this.selectedDate,
      status: 'scheduled',
      dentistNotes: '',
      patientId: String,
    }
    this.apiService.post("/patients/appointment", body).subscribe();

  }

  bookAppointment() {

    const calendarApi = this.selected.view.calendar
    if (this.selectedDentist && this.selectedTime && this.selectedDate) {
      this.postAppointment();

      calendarApi.addEvent({
        id: createEventId(),
        title: `Appointment`,
        start: this.selectedDate + 'T' + this.convertTimeTo24(this.selectedTime),
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
        panelClass: ['snackbar-success', 'custom-snackbar']
      });

      // Reset selections
      calendarApi.unselect(); // clear date selection

      this.selectedDate = null;
      this.selectedDentist = '';
      this.selectedTime = '';
    } else {
      this.snackBar.open('Please select both a dentist and a time slot.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar']
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

  // // Get available slots based on selected dentist
  // getAvailableSlots(): string[] | undefined {
  //   const dentist = this.staffs.find(d => d.name === this.selectedDentist);
  //   return dentist ? dentist.availability : [];
  // }

  // Cancel booking process
  cancelBooking() {
    this.selectedDate = null;
    this.selectedDentist = '';
    this.selectedTime = '';
    this.selectedAppointment = null;
  }

  // Leave a Review Method
  leaveReview(appointment: EventApi) {
    // Placeholder action: Show a snackbar
    this.snackBar.open('Redirecting to review form...', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info', 'custom-snackbar']
    });

  }

  saveDentistNotes() {
    if (this.selectedAppointment) {
      this.snackBar.open('Notes saved successfully.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar']
      });
    }
  }
}
