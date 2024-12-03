import {Component, OnInit} from "@angular/core";
import {CommonModule, NgIf, NgOptimizedImage} from "@angular/common";
import {ApiService} from '../../../api.service';

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

    public patientInfo: any;
    public treatmentPlan: any;

    visitRecords: any[] = [];
    allergyRecords: any[] = [];
    medicationRecords: any[] = [];
    labRecords: any[] = [];
    immunizationRecords: any[] = [];

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.get("/patient/information").subscribe({
            next: res => {
                if (!ApiService.isOk(res.status)) {
                    // fail silently
                    return;
                }

                this.patientInfo = res.body;
                if (this.patientInfo.patientTreatmentPlan != null) {
                    this.treatmentPlan = {
                        planName: this.patientInfo.patientTreatmentPlan.planName,
                        staffId: this.patientInfo.patientTreatmentPlan.staffId,
                        startDate: this.patientInfo.patientTreatmentPlan.startDate,
                        endDate: this.patientInfo.patientTreatmentPlan.endDate
                    };
                } else {
                    this.treatmentPlan = {
                        planName: '',
                        staffId: '',
                        startDate: '',
                        endDate: ''
                    };
                }
            }
        });
    }
}
