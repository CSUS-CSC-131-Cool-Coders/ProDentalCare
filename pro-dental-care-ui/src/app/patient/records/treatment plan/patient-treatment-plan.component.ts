import {Component, Input} from "@angular/core";
import { CommonModule } from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ApiService} from '../../../api.service';
import {Router} from '@angular/router';


@Component({
  selector: "treatment-plan",
  templateUrl: "./patient-treatment-plan.component.html",
  styleUrls: ["./patient-treatment-plan.component.css"],
  standalone: true,
  imports: [CommonModule, NgIf, NgOptimizedImage],
})
export class PatientTreatmentPlan {
  toDoExpanded = false;
  treatmentPlanExpanded = false;

  @Input()
  public dentistNotes: string[] = [];
  @Input()
  public apptDate: string[] = [];
  @Input()
  public planName: string;
  @Input()
  public startTimeline: string;
  @Input()
  public endTimeline: string;
  @Input()
  public provider: string;


  public constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.apiService.get("/patient/records/treatmentPlan").subscribe({
      next: res => {
        let body: any = res.body;
        const appointments = body.treatmentAppointment || [];
        this.dentistNotes = appointments.map((appt: any) => appt.dentistNotes || []);
        this.apptDate = appointments.map((appt: any) => appt.date ? this.formatDate(appt.date) : []);

        this.planName = body.treatmentPlan?.treatment || "No Treatment Plan Provided";
        let rawStartDate = body.treatmentPlan?.start_time || [];
        this.startTimeline = rawStartDate ? this.formatDate(rawStartDate) : 'N/A';
        let rawEndDate = body.treatmentPlan?.end_time || [];
        this.endTimeline = rawEndDate ? this.formatDate(rawEndDate) : 'N/A';
        this.provider = body.treatmentPlan?.provider || [];
      },
      error: err => {
        console.log("Error fetching treatment plan information");
      }
    });
  }

  private formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }
}
