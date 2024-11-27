import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { AppointmentService, Dentist } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatExpansionModule,
    MatSelectModule,
    MatButtonModule,

  ],
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {
  date: string;
  selectedDentist: string;
  selectedTime: string;
  availableDentists: Dentist[] = [];
  timeSlots: string[] = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AppointmentModalComponent>,
    private appointmentService: AppointmentService
  ) {
    this.date = data.date;
  }

  ngOnInit() {
    this.availableDentists = this.appointmentService.dentists.filter(d => d.availableDates.includes(this.date));
  }

  bookAppointment() {
    if (this.selectedDentist && this.selectedTime) {
      const newAppointment = {
        id: Date.now(),
        date: new Date(this.date),
        time: this.selectedTime,
        dentist: this.selectedDentist
      };
      this.appointmentService.addAppointment(newAppointment);
      this.dialogRef.close();
    } else {
      alert('Please select both dentist and time slot.');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
