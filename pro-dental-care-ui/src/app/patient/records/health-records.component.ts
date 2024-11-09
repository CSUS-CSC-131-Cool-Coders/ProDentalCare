import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "patient-summary",
  template: `
    <main class="patient-summary">

      <!-- Accordion Sections -->

      <section class="medical-records">

        <!-- Visits Accordion -->
        <section class="accordion-item" [class.expanded]="visitsExpanded" [class.closed]="!visitsExpanded">
          <header class="accordion-header" (click)="visitsExpanded = !visitsExpanded">
            <h2 class="accordion-title">VISITS</h2>
            <img
              [src]="visitsExpanded ? 'assets/up.png' : 'assets/down.png'"
              alt=""
              class="accordion-icon"
            />
          </header>
          <div class="accordion-content" *ngIf="visitsExpanded">
            <table class="accordion-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Provider</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12/12/2024</td>
                  <td>Dr. Emily White</td>
                  <td>Regular cleaning, no major issues. Scheduled next visit for 6 months.</td>
                </tr>
                <tr>
                  <td>06/15/2024</td>
                  <td>Dr. John Doe</td>
                  <td>Follow-up visit for root canal treatment.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Allergies Accordion -->
        <section class="accordion-item" [class.expanded]="allergiesExpanded" [class.closed]="!allergiesExpanded">
          <header class="accordion-header" (click)="allergiesExpanded = !allergiesExpanded">
            <h2 class="accordion-title">ALLERGIES</h2>
            <img
              [src]="allergiesExpanded ? 'assets/up.png' : 'assets/down.png'"
              alt=""
              class="accordion-icon"
            />
          </header>
          <div class="accordion-content" *ngIf="allergiesExpanded">
            <table class="accordion-table">
              <thead>
                <tr>
                  <th>Allergy</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Peanuts</td>
                  <td>Severe reaction, carry epinephrine.</td>
                </tr>
                <tr>
                  <td>Penicillin</td>
                  <td>Mild rash, avoid use.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Medications Accordion -->
        <section class="accordion-item" [class.expanded]="medsExpanded" [class.closed]="!medsExpanded">
          <header class="accordion-header" (click)="medsExpanded = !medsExpanded">
            <h2 class="accordion-title">MEDICATIONS</h2>
            <img
              [src]="medsExpanded ? 'assets/up.png' : 'assets/down.png'"
              alt=""
              class="accordion-icon"
            />
          </header>
          <div class="accordion-content" *ngIf="medsExpanded">
            <table class="accordion-table">
              <thead>
                <tr>
                  <th>Date Prescribed</th>
                  <th>Medication</th>
                  <th>Directions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/10/2024</td>
                  <td>Ibuprofen</td>
                  <td>Take 1 tablet every 4-6 hours as needed for pain.</td>
                </tr>
                <tr>
                  <td>11/15/2023</td>
                  <td>Amoxicillin</td>
                  <td>Take 1 capsule twice a day for 10 days.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Labs Accordion -->
        <section class="accordion-item" [class.expanded]="labsExpanded" [class.closed]="!labsExpanded">
          <header class="accordion-header" (click)="labsExpanded = !labsExpanded">
            <h2 class="accordion-title">LABS & PROCEDURES</h2>
            <img
              [src]="labsExpanded ? 'assets/up.png' : 'assets/down.png'"
              alt=""
              class="accordion-icon"
            />
          </header>
          <div class="accordion-content" *ngIf="labsExpanded">
            <table class="accordion-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Lab Name</th>
                  <th>Comments</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>11/01/2024</td>
                  <td>Blood Test</td>
                  <td>Normal results, no action required.</td>
                </tr>
                <tr>
                  <td>09/05/2024</td>
                  <td>Chest X-ray</td>
                  <td>Clear, no abnormalities detected.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Immunizations Accordion -->
        <section class="accordion-item" [class.expanded]="immunizationsExpanded" [class.closed]="!immunizationsExpanded">
          <header class="accordion-header" (click)="immunizationsExpanded = !immunizationsExpanded">
            <h2 class="accordion-title">IMMUNIZATIONS</h2>
            <img
              [src]="immunizationsExpanded ? 'assets/up.png' : 'assets/down.png'"
              alt=""
              class="accordion-icon"
            />
          </header>
          <div class="accordion-content" *ngIf="immunizationsExpanded">
            <table class="accordion-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Immunization</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10/15/2024</td>
                  <td>Flu Vaccine</td>
                </tr>
                <tr>
                  <td>08/01/2023</td>
                  <td>Tetanus Booster</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </section>
    </main>
  `,
  styles: [`
    .accordion-item {
      background-color: #f5f5f5;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      margin-top: 16px;
      transition: background-color 0.3s ease;
    }

    /* Hover effect when the accordion is closed */
    .accordion-item.closed:hover {
      background-color: #e0e0e0; /* Hover effect for closed accordion */
    }

    /* No hover effect when the accordion is open */
    .accordion-item.expanded {
      background-color: #fff;
    }

    .accordion-header {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      padding: 16px;
    }

    .accordion-title {
      font-size: 16px;
      margin: 0;
    }

    .accordion-icon {
      height: 20px;
      width: 20px;
    }

    .accordion-content {
      padding: 16px;
    }

    .accordion-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    .accordion-table th, .accordion-table td {
      padding: 8px 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .accordion-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    .accordion-table tr:hover {
      background-color: #f9f9f9;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class PatientHealthRecords {
  visitsExpanded = false;
  allergiesExpanded = false;
  medsExpanded = false;
  labsExpanded = false;
  immunizationsExpanded = false;
}
