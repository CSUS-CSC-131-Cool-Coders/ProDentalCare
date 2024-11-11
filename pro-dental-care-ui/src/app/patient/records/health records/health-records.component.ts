import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "patient-summary",
  templateUrl: "./patient-summary.component.html",
  styleUrls: ["./patient-summary.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class PatientHealthRecords {
  visitsExpanded = false;
  allergiesExpanded = false;
  medsExpanded = false;
  labsExpanded = false;
  immunizationsExpanded = false;
}
