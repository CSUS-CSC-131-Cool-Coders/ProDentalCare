import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: "health-records",
  templateUrl: "./health-records.component.html",
  styleUrls: ["./health-records.component.css"],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage],
})
export class PatientHealthRecords {
  visitsExpanded = false;
  allergiesExpanded = false;
  medsExpanded = false;
  labsExpanded = false;
  immunizationsExpanded = false;
}
