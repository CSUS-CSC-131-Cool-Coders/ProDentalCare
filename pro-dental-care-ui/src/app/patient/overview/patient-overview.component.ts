import {Component, Input, OnInit} from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ApiService} from "../../api.service";
import {Router, RouterLink} from "@angular/router";
import {timeout} from "rxjs";

@Component({
  selector: "app-patient-overview",
  templateUrl: "./patient-overview.component.html",
  styleUrls: ["./patient-overview.component.css"],
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
})
export class PatientOverviewComponent implements OnInit {

  @Input()
  public nextAppointmentDate: string;
  @Input()
  public treatmentPlan: string;
  @Input()
  public nextBillDate: string;
  @Input()
  public nextBillAmt: string;

  public constructor(private apiService: ApiService, private router: Router) {
  }

  public ngOnInit(): void {
    this.apiService.checkAccess("patient", "/dashboard");

    this.apiService.get("/patient/dashboard").subscribe({
      next: res => {
        let body: any = res.body;
        this.nextAppointmentDate = body.nextAppointmentDate;
        this.treatmentPlan = body.treatmentPlan;
        if (body.nextPayment != null) {
          this.nextBillDate = body.nextPayment.date;
          this.nextBillAmt = body.nextPayment.amount;
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
