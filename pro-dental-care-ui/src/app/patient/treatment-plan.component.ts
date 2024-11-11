import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "treatment-plan",
  template: `
    <main class="treatment-plan">

      <!-- To Do Accordion -->
      <section class="accordion-item" [class.expanded]="toDoExpanded" [class.closed]="!toDoExpanded">
        <header class="accordion-header" (click)="toDoExpanded = !toDoExpanded">
          <h2 class="accordion-title">To Do</h2>
          <img
            [src]="toDoExpanded ? 'assets/up.png' : 'assets/down.png'"
            alt=""
            class="accordion-icon"
          />
        </header>
        <div class="accordion-content" *ngIf="toDoExpanded">
          <table class="accordion-table">
            <thead>
              <tr>
                <th>To Do</th>
                <th>Appointment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Clean Teeth
                  <div class="provider-name">Provider: Dr. Emily White</div>
                </td>
                <td>12/12/2024</td>
              </tr>
              <tr>
                <td>
                  Follow-up visit for root canal treatment
                  <div class="provider-name">Provider: Dr. John Doe</div>
                </td>
                <td>06/15/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Treatment Plan Accordion -->
      <section class="accordion-item" [class.expanded]="treatmentPlanExpanded" [class.closed]="!treatmentPlanExpanded">
        <header class="accordion-header" (click)="treatmentPlanExpanded = !treatmentPlanExpanded">
          <h2 class="accordion-title">Treatment Plan</h2>
          <img
            [src]="treatmentPlanExpanded ? 'assets/up.png' : 'assets/down.png'"
            alt=""
            class="accordion-icon"
          />
        </header>
        <div class="accordion-content" *ngIf="treatmentPlanExpanded">
          <table class="accordion-table">
            <thead>
              <tr>
                <th>Treatment Plan</th>
                <th>Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Orthodontic Adjustment
                  <div class="provider-name">Provider: Dr. Lee</div>
                </td>
                <td>02/01/2025 - 06/01/2025</td>
              </tr>
              <tr>
                <td>
                  Monthly Check-up
                  <div class="provider-name">Provider: Dr. Smith</div>
                </td>
                <td>07/01/2025 - 12/31/2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </main>
  `,
  styles: [
    `
      .accordion-item {
        background-color: #f5f5f5;
        border: 1px solid #d9d9d9;
        border-radius: 8px;
        margin-top: 16px;
        transition: background-color 0.3s ease;
      }

      .accordion-item.closed:hover {
        background-color: #e0e0e0;
      }

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

      .accordion-table th,
      .accordion-table td {
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

      .provider-name {
        font-size: 0.875rem;
        color: #666;
        margin-top: 4px;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
})
export class PatientTreatmentPlan {
  toDoExpanded = false;
  treatmentPlanExpanded = false;
}
