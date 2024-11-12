import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './patient-information.component.html',
  styleUrls: ['./patient-information.component.css']
})
export class PatientInformationComponent {
  expandedSection: number | null = null;

  toggleSection(index: number): void {
    if (this.expandedSection === index) {
      this.expandedSection = null;
    } else {
      this.expandedSection = index;
    }

    // TODO: Once I create / add the corresponding service file to interface with db ill add the required components here.
  }
}
