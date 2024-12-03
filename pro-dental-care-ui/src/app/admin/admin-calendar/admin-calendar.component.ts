// admin-calendar.component.ts

import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Staff } from '../staff-information/staff-model';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'admin-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule, MatSnackBarModule],
  templateUrl: './admin-calendar.component.html',
  styleUrls: ['./admin-calendar.component.css'],
})
export class AdminCalendarComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin],
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  });

  currentEvents = signal<EventApi[]>([]);
  upcomingEvents = signal<EventApi[]>([]);
  pastEvents = signal<EventApi[]>([]);

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

  // Selected event type, staff, and time slot
  selectedEventType: string = '';
  selectedStaff: string = '';
  selectedDate: string | null = '';
  selected: DateSelectArg;
  selectedEvent: EventApi | null = null; // Changed to EventApi

  constructor(private changeDetector: ChangeDetectorRef, private snackBar: MatSnackBar) {}

  handleDateSelect(selectInfo: DateSelectArg) {
    // Check if selected date is available and not in the past
    const selectedDate = new Date(selectInfo.startStr);
    const today = new Date();
    // Set time to 00:00:00 for accurate comparison
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.snackBar.open('Cannot schedule an event on the selected date.', 'Close', {
        duration: 3000, // Duration in milliseconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar'],
      });
      return; // Exit the function early
    }

    this.selected = selectInfo;
    this.selectedDate = selectInfo.startStr; // Set the selected date
    // Clear existing selections if any
    this.selectedEventType = '';
    this.selectedStaff = '';

    // Clear any selected event details
    this.selectedEvent = null;
  }

  handleEventClick(clickInfo: EventClickArg) {
    // Set the selected event to display details
    this.selectedEvent = clickInfo.event;
    if (this.selectedDate) {
      this.selectedDate = null;
    }
  }

  // Select Event from Sidebar
  selectEvent(event: EventApi) {
    this.selectedEvent = event;
    // If a date is selected, clear it to hide event lists
    if (this.selectedDate) {
      this.selectedDate = null;
    }
  }

  // Close the event details view
  closeEventDetails() {
    this.selectedEvent = null;
  }

  // Cancel Event Method
  cancelEvent(event: EventApi) {
    if (confirm('Are you sure you want to cancel this event?')) {
      event.remove(); // Removes the event from the calendar

      // Show cancellation snackbar
      this.snackBar.open('Event cancelled successfully.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar'],
      });

      // Clear selected event details
      this.selectedEvent = null;
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for ExpressionChangedAfterItHasBeenCheckedError

    const today = new Date();

    const upcoming = events.filter((event) => new Date(event.start!) >= today);
    const past = events.filter((event) => new Date(event.start!) < today);

    this.upcomingEvents.set(upcoming);
    this.pastEvents.set(past);
  }

  scheduleEvent() {
    const calendarApi = this.selected.view.calendar;
    if (this.selectedEventType && this.selectedStaff && this.selectedDate) {
      calendarApi.addEvent({
        id: createEventId(),
        title: `${this.selectedEventType} with ${this.selectedStaff}`,
        start: `${this.selectedDate}T${this.convertTimeTo24(this.selectedEventTypeTime)}`,
        allDay: false,
        display: 'block',
        extendedProps: {
          eventType: this.selectedEventType,
          staff: this.selectedStaff,
          eventNotes: null,
        },
      });

      // Show success snackbar
      this.snackBar.open('Event scheduled successfully!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar'],
      });

      // Reset selections
      calendarApi.unselect(); // clear date selection

      this.selectedDate = null;
      this.selectedEventType = '';
      this.selectedStaff = '';
      this.selectedEvent = null; // Ensure no event is selected
    } else {
      this.snackBar.open('Please select an event type, staff member, and time slot.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar'],
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

  // Get available time slots based on selected event type
  selectedEventTypeTime: string = ''; // Added to capture time slot

  getAvailableTimeSlots(): string[] | undefined {
    // You can define different time slots based on event type if needed
    // For simplicity, returning the same availability as staff
    const staff = this.staffs.find((s) => s.name === this.selectedStaff);
    return staff ? staff.availability : [];
  }

  // Cancel scheduling process
  cancelScheduling() {
    this.selectedDate = null;
    this.selectedEventType = '';
    this.selectedStaff = '';
    this.selectedEvent = null;
  }

  // Leave a Review Method (Optional: Can be repurposed or removed for admin)
  leaveReview(event: EventApi) {
    // Placeholder action: Show a snackbar
    this.snackBar.open('Redirecting to review form...', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info', 'custom-snackbar'],
    });

    // TODO: Implement actual review functionality
    // For example, navigate to a review component or open a dialog
  }

  // Save Event Notes Method (Optional)
  saveEventNotes() {
    if (this.selectedEvent) {
      // Assuming you have a backend to save these notes
      // Otherwise, it's already updated in extendedProps
      this.snackBar.open('Notes saved successfully.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar'],
      });
    }
  }
}
