import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion'; // Import Expansion Module
import { MatCardModule } from '@angular/material/card'; // Optional: For card layouts
import { MatIconModule } from '@angular/material/icon'; // Optional: For icons
import { Staff } from './staff-model';

@Component({
  selector: 'app-staff-information',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './staff-information.component.html',
  styleUrl: './staff-information.component.css'
})
export class StaffInformationComponent implements OnInit{
  constructor() {

  }

  staffs: Staff[] = [
    {
      id: 1,
      name: 'Jane Doe',
      position: 'Dentist',
      pay: '$150,000/year',
      yearsWorked: 12,
      email: "123JaneSmith@gmail.com",
      contactNumber: '1(916)123-4567',
      qualifications: ['DDS', 'Cerrtified Invisalign Provider'],
      profilePic: '../../../'
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
    },
  ]

  ngOnInit(): void {
  }
}
