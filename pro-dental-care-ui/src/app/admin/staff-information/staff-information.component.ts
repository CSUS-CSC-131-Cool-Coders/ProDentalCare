// src/app/staff-information/staff-information.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion'; // Import Expansion Module
import { MatCardModule } from '@angular/material/card'; // Optional: For card layouts
import { MatIconModule } from '@angular/material/icon'; // Optional: For icons
import { ApiService } from '../../api.service'; // Adjust the path as necessary
import { StaffMemberDTO } from '../../models/staff-member-dto'; // Adjust the path as necessary
import { AdminStaffInfoResponse } from '../../models/amin-staff-info-response'; // Adjust the path as necessary

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
  styleUrls: ['./staff-information.component.css']
})
export class StaffInformationComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  staffs: StaffMemberDTO[] = []; // Initialize as empty array

  ngOnInit(): void {
    this.fetchStaffInformation();
  }

  fetchStaffInformation(): void {
    this.apiService.get<AdminStaffInfoResponse>('/admin/staff-information').subscribe({
      next: res => {
        if (res.status === 200 && res.body) {
          this.staffs = res.body.staffMembers;
        } else {
          console.error('Unexpected response structure:', res);
          // Optionally, display a user-friendly message in the UI
        }
      },
      error: err => {
        console.error('Error fetching staff information:', err);
        // Optionally, display an error message in the UI
      }
    });
  }
}
