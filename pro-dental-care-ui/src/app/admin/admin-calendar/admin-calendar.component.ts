import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminAppointmentsResponse } from '../../models/admin-appointments-response';
import { AppointmentInfo, StaffInfo } from '../../models/appointment-info';
import { ApiService } from '../../api.service';
import { AdminStaffInfoResponse } from '../../models/admin-staff-info-response';

@Component({
  selector: 'admin-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    FormsModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
})
export class AdminCalendarComponent implements OnInit {
  // State Variables
  appointments: AppointmentInfo[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  // Calendar Options
  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [], // Will be populated after fetching from API
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    // eventClick: this.handleAppointmentClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  // Selected Appointment Details
  selectedDate: string | null = '';
  selectedAppointment: AppointmentInfo | null = null;
  selectedStaff: string = '';
  selectedStatus: string = '';

  // Available Staff Members
  staffs: StaffInfo[] = [];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCalendarAppointments();
    this.fetchStaffInformation();
  }

  /**
   * Fetches calendar appointments from the backend API.
   */
  fetchCalendarAppointments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.get<AdminAppointmentsResponse>('/admin/calendar').subscribe({
      next: (res) => {
        this.isLoading = false;
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
        this.isLoading = false;
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
    this.apiService.get<AdminStaffInfoResponse>('/admin/staff-information').subscribe({
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
      title: `Patient ID: ${appt.patientId}`,
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

  /**
   * Retrieves concatenated staff member names for an appointment.
   * @param appt - The appointment information.
   * @returns A comma-separated string of staff member names.
   */
  getStaffNames(appt: AppointmentInfo): string {
    return appt.staffMembers.map(s => s.name).join(', ');
  }

  /**
   * Retrieves upcoming appointments.
   * @returns An array of upcoming AppointmentInfo objects.
   */
  getUpcomingAppointments(): AppointmentInfo[] {
    const today = new Date();
    // Normalize today's date
    today.setHours(0, 0, 0, 0);
    return this.appointments.filter(a => new Date(a.date) >= today);
  }

  /**
   * Retrieves past appointments.
   * @returns An array of past AppointmentInfo objects.
   */
  getPastAppointments(): AppointmentInfo[] {
    const today = new Date();
    // Normalize today's date
    today.setHours(0, 0, 0, 0);
    return this.appointments.filter(a => new Date(a.date) < today);
  }

  /**
   * Handles date selection on the calendar.
   * @param selectInfo - Information about the selected date range.
   */
  handleDateSelect(selectInfo: DateSelectArg): void {
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.snackBar.open('Cannot schedule an appointment on the selected date.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error', 'custom-snackbar'],
      });
      return;
    }

    this.selectedDate = selectInfo.startStr;
    this.selectedAppointment = null;
    this.selectedStatus = '';
  }

  /**
   * Handles event click on the calendar.
   * @param clickInfo - Information about the clicked event.
   */
  handleAppointmentClick(clickInfo: AppointmentInfo): void {
    const apptId = parseInt(String(clickInfo.appointmentId), 10);
    const appt = this.appointments.find(a => a.appointmentId === apptId);
    if (appt) {
      this.selectedAppointment = appt;
      this.selectedDate = null;
    }
  }

  // // Select Appointment from Sidebar
  // selectAppointment(appointment: EventApi) {
  //   this.selectedAppointment = appointment;
  //   // If a date is selected, clear it to hide appointment lists
  //   if (this.selectedDate) {
  //     this.selectedDate = null;
  //   }
  // }

  /**
   * Handles events set on the calendar.
   * @param events - Array of current events on the calendar.
   */
  handleEvents(events: EventApi[]): void {
    // Optionally handle any event-related logic
  }

  /**
   * Schedules a new appointment by sending it to the backend API.
   */
  scheduleAppointment(): void {
    if (this.selectedDate && this.selectedStaff && this.selectedStatus) {
      const appointmentPayload = {
        date: this.selectedDate,
        status: this.selectedStatus,
        dentistNotes: '',
        patientId: 'PATIENT123', // Replace with actual patient ID selection
        staffMemberId: this.selectedStaff, // Assuming single staff member for simplicity
      };

      this.apiService.post('/admin/calendar', appointmentPayload).subscribe({
        next: () => {
          this.snackBar.open('Appointment scheduled successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success', 'custom-snackbar'],
          });
          this.fetchCalendarAppointments();
          this.resetScheduling();
        },
        error: (error) => {
          console.error('Error scheduling appointment:', error);
          this.snackBar.open('Failed to schedule appointment.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      });
    } else {
      this.snackBar.open('Please select a date, staff member, and status.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error', 'custom-snackbar'],
      });
    }
  }

  /**
   * Resets the scheduling form.
   */
  resetScheduling(): void {
    this.selectedDate = null;
    this.selectedAppointment = null;
    this.selectedStaff = '';
    this.selectedStatus = '';
  }

  /**
   * Cancels an existing appointment.
   * @param appointment - The appointment to cancel.
   */
  cancelAppointment(appointment: AppointmentInfo): void {
    // if (confirm('Are you sure you want to cancel this appointment?')) {
    //   this.apiService.delete(`/admin/calendar/${appointment.appointmentId}`).subscribe({
    //     next: () => {
    //       this.snackBar.open('Appointment cancelled successfully.', 'Close', {
    //         duration: 3000,
    //         panelClass: ['snackbar-success', 'custom-snackbar'],
    //       });
    //       this.fetchCalendarAppointments();
    //       this.selectedAppointment = null;
    //     },
    //     error: (error) => {
    //       console.error('Error cancelling appointment:', error);
    //       this.snackBar.open('Failed to cancel appointment.', 'Close', {
    //         duration: 3000,
    //         panelClass: ['snackbar-error', 'custom-snackbar'],
    //       });
    //     }
    //   });
    // }
  }

  /**
   * Saves notes for an appointment.
   */
  saveAppointmentNotes(): void {
    if (this.selectedAppointment) {
      const updatedNotes = this.selectedAppointment.dentistNotes;

      const updatePayload = { notes: updatedNotes };

      this.apiService.put(`/admin/calendar/${this.selectedAppointment.appointmentId}`, updatePayload).subscribe({
        next: () => {
          this.snackBar.open('Notes saved successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success', 'custom-snackbar'],
          });
          this.fetchCalendarAppointments(); // Refresh to get updated notes
        },
        error: (error) => {
          console.error('Error saving notes:', error);
          this.snackBar.open('Failed to save notes.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      });
    }
  }

  /**
   * Closes the appointment details view.
   */
  closeEventDetails(): void {
    this.selectedAppointment = null;
  }

  /**
   * Cancels the scheduling process and resets selections.
   */
  cancelScheduling(): void {
    this.resetScheduling();
  }

  /**
   * Optional: Implement review functionality if needed.
   * @param appointment - The appointment to review.
   */
  leaveReview(appointment: AppointmentInfo): void {
    this.snackBar.open('Redirecting to review form...', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-info', 'custom-snackbar'],
    });

    // TODO: Implement actual review functionality
    // Example: Navigate to a review component or open a dialog
  }
}
