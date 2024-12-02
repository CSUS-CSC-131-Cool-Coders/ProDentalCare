import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgIf, NgOptimizedImage } from "@angular/common";
import {ApiService} from "../../../api.service";

@Component({
  selector: "health-records",
  templateUrl: "./health-records.component.html",
  styleUrls: ["./health-records.component.css"],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage],
})
export class PatientHealthRecords implements OnInit {
  visitsExpanded = false;
  allergiesExpanded = false;
  medsExpanded = false;
  labsExpanded = false;
  immunizationsExpanded = false;

  visitRecords: any[] = [];
  allergyRecords: any[] = [];
  medicationRecords: any[] = [];
  labRecords: any[] = [];
  immunizationRecords: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // this.apiService.getVisitRecords().subscribe({
    //   next: (res) => (this.visitRecords = res.body || []),
    //   error: (err) => console.error("Error fetching visit records:", err),
    // });
    //
    // this.apiService.getAllergyRecords().subscribe({
    //   next: (res) => (this.allergyRecords = res.body || []),
    //   error: (err) => console.error("Error fetching allergy records:", err),
    // });
    //
    // this.apiService.getMedicationRecords().subscribe({
    //   next: (res) => (this.medicationRecords = res.body || []),
    //   error: (err) => console.error("Error fetching medication records:", err),
    // });
    //
    // this.apiService.getLabRecords().subscribe({
    //   next: (res) => (this.labRecords = res.body || []),
    //   error: (err) => console.error("Error fetching lab records:", err),
    // });
    //
    // this.apiService.getImmunizationRecords().subscribe({
    //   next: (res) => (this.immunizationRecords = res.body || []),
    //   error: (err) => console.error("Error fetching immunization records:", err),
    // });
  }
}
