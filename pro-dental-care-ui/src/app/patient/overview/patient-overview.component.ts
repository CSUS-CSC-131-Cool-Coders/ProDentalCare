import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: "app-patient-overview",
  templateUrl: "./patient-overview.component.html",
  styleUrls: ["./patient-overview.component.css"],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NgIf],
})
export class PatientOverviewComponent {}
