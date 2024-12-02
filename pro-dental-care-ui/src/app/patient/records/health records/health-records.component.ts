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

  }
}
