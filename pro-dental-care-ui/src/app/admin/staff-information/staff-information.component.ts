import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion'; // Import Expansion Module
import { MatCardModule } from '@angular/material/card'; // Optional: For card layouts
import { MatIconModule } from '@angular/material/icon'; // Optional: For icons


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

  ngOnInit(): void {
  }
}
