import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-staff-information',
  templateUrl: './staff-information.component.html',
  styleUrls: ['./staff-information.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class StaffInformationComponent implements OnInit {
  staffInfo: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Initialize staff information
    this.apiService.get("/staff/information").subscribe({
      next: res => {
        this.staffInfo = res.body;
      }
    })
  }
}
