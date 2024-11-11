import { Component } from "@angular/core";

@Component({
  selector: "treatment-plan",
  templateUrl: "./treatment-plan.component.html",
  styleUrls: ["./treatment-plan.component.css"],
})
export class PatientTreatmentPlan {
  toDoExpanded = false;
  treatmentPlanExpanded = false;
}
