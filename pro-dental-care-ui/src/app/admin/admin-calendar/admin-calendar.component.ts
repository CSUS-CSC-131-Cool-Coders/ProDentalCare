// src/app/admin-calendar/admin-calendar.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AdminCalendarResponse } from '../../models/admin-calendar-response';
import { EventInfo } from '../../models/event-info';
import { ApiService } from '../../api.service';

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
  events: EventInfo[] = [];
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
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  };

  // Selected Event Details
  selectedDate: string | null = '';
  selectedEventType: string = '';
  selectedStaff: string = '';
  selectedEvent: EventApi | null = null;
  selectedEventTypeTime: string = '';

  // Sample Staff Data (Consider fetching from API)
  staffs: Staff[] = [
    {
      id: 1,
      name: 'Jane Doe',
      position: 'Manager',
      pay: '$150,000/year',
      yearsWorked: 12,
      email: 'jane.doe@example.com',
      contactNumber: '1(916)123-4567',
      qualifications: ['MBA', 'Certified Project Manager'],
      availability: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM'],
    },
    {
      id: 2,
      name: 'John Smith',
      position: 'Developer',
      pay: '$90,000/year',
      yearsWorked: 4,
      email: 'john.smith@example.com',
      contactNumber: '1(279)987-6543',
      qualifications: ['B.Sc. Computer Science', 'Certified Angular Developer'],
      availability: ['09:30 AM', '10:30 AM', '01:00 PM', '03:00 PM'],
    },
    // Add more staff members as needed
  ];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchCalendarEvents();
  }

  /**
   * Fetches calendar events from the backend API.
   */
  fetchCalendarEvents(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.apiService.get<AdminCalendarResponse>('/admin/calendar').subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.events) {
          this.events = res.events;
          this.populateCalendarEvents();
        } else {
          console.error('Unexpected response structure:', res);
          this.errorMessage = 'Unexpected response from the server.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching calendar events:', err);
        this.errorMessage = 'Failed to load calendar events. Please try again later.';
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error', 'custom-snackbar'],
        });
      }
    });
  }

  /**
   * Populates the calendar with fetched events.
   */
  populateCalendarEvents(): void {
    const formattedEvents = this.events.map((event) => ({
      id: event.eventId.toString(),
      title: event.title,
      start: event.startTime,
      end: event.endTime,
      extendedProps: {
        eventType: event.eventType,
        staff: event.staffMemberName,
        eventNotes: event.notes,
      },
    }));

    this.calendarOptions.events = formattedEvents;
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
      this.snackBar.open('Cannot schedule an event on the selected date.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-error', 'custom-snackbar'],
      });
      return;
    }

    this.selectedDate = selectInfo.startStr;
    this.selectedEventType = '';
    this.selectedStaff = '';
    this.selectedEvent = null;
  }

  /**
   * Handles event click on the calendar.
   * @param clickInfo - Information about the clicked event.
   */
  handleEventClick(clickInfo: EventClickArg): void {
    this.selectedEvent = clickInfo.event;
    this.selectedDate = null;
  }

  /**
   * Handles events set on the calendar.
   * @param events - Array of current events on the calendar.
   */
  handleEvents(events: EventApi[]): void {
    const today = new Date();

    const upcoming = events.filter((event) => new Date(event.start!) >= today);
    const past = events.filter((event) => new Date(event.start!) < today);

    // You can store upcoming and past events if needed
  }

  /**
   * Schedules a new event by sending it to the backend API.
   */
  scheduleEvent(): void {
    if (this.selectedEventType && this.selectedStaff && this.selectedDate && this.selectedEventTypeTime) {
      const newEvent: Partial<EventInfo> = {
        title: `${this.selectedEventType} with ${this.selectedStaff}`,
        startTime: `${this.selectedDate}T${this.convertTimeTo24(this.selectedEventTypeTime)}`,
        endTime: `${this.selectedDate}T${this.convertTimeTo24(this.selectedEventTypeTime)}`, // Adjust endTime as needed
        eventType: this.selectedEventType,
        staffMemberName: this.selectedStaff,
        notes: '',
      };

      this.apiService.post('/admin/calendar', newEvent).subscribe({
        next: () => {
          this.snackBar.open('Event scheduled successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success', 'custom-snackbar'],
          });
          this.fetchCalendarEvents();
          this.resetScheduling();
        },
        error: (error) => {
          console.error('Error scheduling event:', error);
          this.snackBar.open('Failed to schedule event.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      });
    } else {
      this.snackBar.open('Please select an event type, staff member, and time slot.', 'Close', {
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
    this.selectedEventType = '';
    this.selectedStaff = '';
    this.selectedEventTypeTime = '';
  }

  /**
   * Converts 12-hour time format to 24-hour format.
   * @param time - Time string in 12-hour format (e.g., "02:00 PM").
   * @returns Time string in 24-hour format (e.g., "14:00:00").
   */
  convertTimeTo24(time: string): string {
    const [timeStr, modifier] = time.split(' ');
    let [hours, minutes] = timeStr.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    hours = hours.padStart(2, '0');
    minutes = minutes.padStart(2, '0');

    return `${hours}:${minutes}:00`;
  }

  /**
   * Retrieves available time slots based on the selected staff member.
   * @returns Array of available time slots or undefined.
   */
  getAvailableTimeSlots(): string[] | undefined {
    const staff = this.staffs.find((s) => s.name === this.selectedStaff);
    return staff ? staff.availability : [];
  }

  /**
   * Cancels the scheduling process and resets selections.
   */
  cancelScheduling(): void {
    this.resetScheduling();
  }

  /**
   * Closes the event details view.
   */
  closeEventDetails(): void {
    this.selectedEvent = null;
  }

  /**
   * Cancels an existing event.
   * @param event - The event to cancel.
   */
  cancelEvent(event: EventApi): void {
    if (confirm('Are you sure you want to cancel this event?')) {
      // Remove from backend first
      this.apiService.delete(`/admin/calendar/${event.id}`).subscribe({
        next: () => {
          event.remove(); // Removes the event from the calendar
          this.snackBar.open('Event cancelled successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success', 'custom-snackbar'],
          });
          this.selectedEvent = null;
        },
        error: (error) => {
          console.error('Error cancelling event:', error);
          this.snackBar.open('Failed to cancel event.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error', 'custom-snackbar'],
          });
        }
      });
    }
  }

  /**
   * Saves notes for an event.
   */
  saveEventNotes(): void {
    if (this.selectedEvent) {
      const updatedNotes = this.selectedEvent.extendedProps['eventNotes'] || '';
      this.apiService.put(`/admin/calendar/${this.selectedEvent.id}`, { notes: updatedNotes }).subscribe({
        next: () => {
          this.snackBar.open('Notes saved successfully.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success', 'custom-snackbar'],
          });
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
   * Optional: Redirects to a review form or performs another action.
   * @param event - The event to review.
   */
  leaveReview(event: EventApi): void {
    this.snackBar.open('Redirecting to review form...', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-info', 'custom-snackbar'],
    });

    // TODO: Implement actual review functionality
    // Example: Navigate to a review component or open a dialog
  }
}
