import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

import { StaffInfo } from '../../../models/staff-info'; // Adjust the path as necessary
import { ApiService } from '../../../api.service'; // Adjust the path as necessary

@Component({
  selector: 'appointment-scheduler',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule, MatSnackBarModule],
  templateUrl: './appointment-scheduler.component.html',
  styleUrls: ['./appointment-scheduler.component.css']
})
export class AppointmentSchedulerComponent implements OnInit {
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    initialView: 'dayGridMonth',
    events: [], // Will be populated from backend
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];
  upcomingAppointments: EventApi[] = [];
  pastAppointments: EventApi[] = [];

  staffs: StaffInfo[] = []; // Updated to use StaffInfo

  // Selected staff and time slot
  selectedStaff: string = '';
  selectedTime: string = '';
  selectedDate: string | null = '';
  selected: DateSelectArg | null = null;
  selectedAppointment: EventApi | null = null;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchStaffInformation();
    this.fetchPatientAppointments();
  }

  /**
   * Fetches staff information from the backend API.
   */
  fetchStaffInformation(): void {
    this.apiService.get<any>('/admin/staff-information').subscribe({
      next: (res) => {
        if (res.body && res.status === 200) {
          // Map backend staff data to StaffInfo
          this.staffs = res.body.staffMembers.map((staff: any) => ({
            staffId: staff.staffId,
            email: staff.email,
            firstName: staff.firstName,
            lastName: staff.lastName,
            dateOfBirth: staff.dateOfBirth, // Adjust if necessary
            position: staff.position,
            salary: staff.salary,
            yearsWorked: staff.yearsWorked,
            qualifications: staff.qualifications,
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
   * Fetches patient appointments from the backend API.
   */
  fetchPatientAppointments(): void {
    this.apiService.get<any>('/patient/appointments').subscribe({
      next: (res) => {
        if (res.body && res.status === 200) {
          const appointments = res.body.appointments;
          this.populateCalendarEvents(appointments);
        } else {
          console.error('Unexpected response structure:', res);
          this.snackBar.open('Unexpected response from the server.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      },
      error: (err) => {
        console.error('Error fetching appointments:', err);
        this.snackBar.open('Failed to load appointments.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error', 'custom-snackbar'],
        });
      }
    });
  }

  /**
   * Populates the calendar with fetched appointments.
   */
  populateCalendarEvents(appointments: any[]): void {
    const formattedEvents = appointments.map((appt) => ({
      id: appt.appointmentId.toString(),
      title: `Patient ID: ${appt.patientId}`,
      start: this.formatDateTime(appt.date, appt.time),
      end: this.formatDateTime(appt.date, appt.time), // Adjust end time as needed
      extendedProps: {
        status: appt.status,
        dentistNotes: appt.dentistNotes,
        patientId: appt.patientId,
        staffMembers: appt.staffMembers.map((s: any) => `${s.firstName} ${s.lastName}`).join(', '),
      },
    }));

    this.calendarOptions.events = formattedEvents;
  }

  /**
   * Formats date and time strings into ISO format.
   * @param date - The date string.
   * @param time - The time string.
   * @returns ISO formatted datetime string.
   */
  formatDateTime(date: string, time: string): string {
    // Assuming 'date' is in 'YYYY-MM-DD' format and 'time' is in 'HH:MM:SS' 24-hour format
    return `${date}T${time}`;
  }

  /**
   * Handles date selection on the calendar.
   * @param selectInfo - Information about the selected date range.
   */
  handleDateSelect(selectInfo: DateSelectArg): void {
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    // Normalize dates
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.snackBar.open('Cannot schedule an appointment on the selected date.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error', 'custom-snackbar'],
      });
      return;
    }

    this.selected = selectInfo;
    this.selectedDate = selectInfo.startStr; // Set the selected date
    // Clear existing selections if any
    this.selectedStaff = '';
    this.selectedTime = '';

    // Clear any selected appointment details
    this.selectedAppointment = null;
  }

  /**
   * Handles event click on the calendar.
   * @param clickInfo - Information about the clicked event.
   */
  handleEventClick(clickInfo: EventClickArg): void {
    const apptId = parseInt(clickInfo.event.id, 10);
    // Fetch appointment details from the backend if necessary
    // For now, assuming extendedProps contain necessary details
    this.selectedAppointment = clickInfo.event;
    this.selectedDate = null;
  }

  /**
   * Handles events set on the calendar.
   * @param events - Array of current events on the calendar.
   */
  handleEvents(events: EventApi[]): void {
    this.currentEvents = events;
    this.changeDetector.detectChanges(); // workaround for ExpressionChangedAfterItHasBeenCheckedError

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = events.filter(event => new Date(event.start!) >= today);
    const past = events.filter(event => new Date(event.start!) < today);

    this.upcomingAppointments = upcoming;
    this.pastAppointments = past;
  }

  /**
   * Selects an appointment from the list.
   * @param appointment - The appointment to select.
   */
  selectAppointment(appointment: EventApi): void {
    console.log('Selected Appointment:', appointment);
    this.selectedAppointment = appointment;
    // If a date is selected, clear it to hide appointment lists
    if (this.selectedDate) {
      this.selectedDate = null;
    }
  }

  /**
   * Schedules a new appointment by sending it to the backend API and adding it to the calendar.
   */
  scheduleAppointment(): void {
    if (this.selectedDate && this.selectedStaff && this.selectedTime && this.selectedAppointment === null) {
      const appointmentPayload = {
        date: this.selectedDate,
        status: 'Scheduled', // Default status
        dentistNotes: '',
        patientId: 'PATIENT123', // Replace with actual patient ID from auth context
        staffMemberId: this.selectedStaff, // Assuming single staff member for simplicity
      };

      // Send to backend
      this.apiService.post<any>('/admin/calendar', appointmentPayload).subscribe({
        next: (res) => {
          if (res.body && res.status === 200) {
            this.snackBar.open('Appointment scheduled successfully!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success', 'custom-snackbar'],
            });
            // Fetch appointments again to update the calendar
            this.fetchPatientAppointments();
            this.resetScheduling();
          } else {
            console.error('Unexpected response structure:', res);
            this.snackBar.open('Failed to schedule appointment.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error', 'custom-snackbar'],
            });
          }
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
      this.snackBar.open('Please select a date, staff member, and time slot.', 'Close', {
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
    this.selectedTime = '';
  }

  /**
   * Cancels an existing appointment by removing it from the backend and the calendar.
   * @param appointment - The appointment to cancel.
   */
  cancelAppointment(appointment: EventApi): void {
    // if (confirm('Are you sure you want to cancel this appointment?')) {
    //   const apptId = parseInt(appointment.id, 10);
    //   this.apiService.delete<any>(`/admin/calendar/${apptId}`).subscribe({
    //     next: (res) => {
    //       if (res.status === 200) {
    //         this.snackBar.open('Appointment cancelled successfully.', 'Close', {
    //           duration: 3000,
    //           panelClass: ['snackbar-success', 'custom-snackbar'],
    //         });
    //         // Remove event from calendar
    //         appointment.remove();
    //         // Optionally, refresh appointments
    //         this.fetchPatientAppointments();
    //         this.selectedAppointment = null;
    //       } else {
    //         console.error('Unexpected response structure:', res);
    //         this.snackBar.open('Failed to cancel appointment.', 'Close', {
    //           duration: 3000,
    //           panelClass: ['snackbar-error', 'custom-snackbar'],
    //         });
    //       }
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
   * Closes the appointment details view.
   */
  closeAppointmentDetails(): void {
    this.selectedAppointment = null;
  }

  /**
   * Cancels the scheduling process and resets selections.
   */
  cancelBooking(): void {
    this.resetScheduling();
  }

  /**
   * Leaves a review for an appointment.
   * @param appointment - The appointment to review.
   */
  leaveReview(appointment: EventApi): void {
    this.snackBar.open('Redirecting to review form...', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-info', 'custom-snackbar'],
    });

    // TODO: Implement actual review functionality
    // For example, navigate to a review component or open a dialog
  }

  getAvailableSlots(): string[] {
    const slots: string[] = [];
    for (let hour = 9; hour <= 17; hour++) {
      const formattedHour = hour.toString().padStart(2, '0') + ':00';
      slots.push(formattedHour);
    }
    return slots;
  }

  /**
   * Saves dentist notes for an appointment.
   */
  saveDentistNotes(): void {
    if (this.selectedAppointment) {
      const apptId = parseInt(this.selectedAppointment.id, 10);
      const notes = this.selectedAppointment.extendedProps['dentistNotes'];

      const updatePayload = { notes };

      // Send update to backend
      this.apiService.put<any>(`/admin/calendar/${apptId}`, updatePayload).subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.snackBar.open('Notes saved successfully.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-success', 'custom-snackbar'],
            });
            // Refresh appointments to get updated notes
            this.fetchPatientAppointments();
          } else {
            console.error('Unexpected response structure:', res);
            this.snackBar.open('Failed to save notes.', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-error', 'custom-snackbar'],
            });
          }
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
}
