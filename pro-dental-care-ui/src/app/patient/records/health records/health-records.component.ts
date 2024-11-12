import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "health-records",
  templateUrl: "./health-records.component.html",
  styleUrls: ["./health-records.component.css"],
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
