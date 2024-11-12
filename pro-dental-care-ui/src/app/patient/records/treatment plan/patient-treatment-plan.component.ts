import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "treatment-plan",
  templateUrl: "./patient-treatment-plan.component.html",
  styleUrls: ["./patient-treatment-plan.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class PatientTreatmentPlan {
  toDoExpanded = false;
  treatmentPlanExpanded = false;
}
