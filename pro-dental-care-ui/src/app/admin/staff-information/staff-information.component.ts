// src/app/staff-information/staff-information.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../api.service'; // Adjust the path as necessary
import { StaffInfo } from '../../models/staff-info'; // Adjust the path as necessary
import { AdminStaffInfoResponse } from '../../models/admin-staff-info-response';
import {MatProgressSpinner} from '@angular/material/progress-spinner'; // Adjust the path as necessary

@Component({
  selector: 'app-staff-information',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinner,
  ],
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css']
})
export class StaffInformationComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  staffs: StaffInfo[] = []; // Initialize as empty array
  isLoading: boolean = false;
  errorMessage: string = '';

  ngOnInit(): void {
    this.fetchStaffInformation();
  }

  fetchStaffInformation(): void {
    this.isLoading = true;
    this.apiService.get<AdminStaffInfoResponse>('/admin/staff-information').subscribe({
      next: res => {
        this.isLoading = false;
        if (res.status === 200 && res.body) {
          this.staffs = res.body.staffMembers;
        } else {
          console.error('Unexpected response structure:', res);
          this.errorMessage = 'Unexpected response from the server.';
        }
      },
      error: err => {
        this.isLoading = false;
        console.error('Error fetching staff information:', err);
        this.errorMessage = 'Failed to load staff information. Please try again later.';
      }
    });
  }
}
