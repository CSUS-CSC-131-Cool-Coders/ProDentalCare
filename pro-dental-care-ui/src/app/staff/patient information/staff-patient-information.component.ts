import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from "@angular/common";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {ApiService} from "../../api.service";

@Component({
    selector: 'app-staff-patient-information',
    templateUrl: './staff-patient-information.component.html',
    styleUrls: ['./staff-patient-information.component.css'],
    standalone: true,
    imports: [CommonModule, NgIf, NgOptimizedImage, FormsModule],
})
export class StaffPatientInformationComponent implements OnInit {

    public patientInfo: any;

    @Input()
    public treatmentPlan: { planName: string, staffId: string, startDate: string, endDate: string };

    @Input()
    public treatmentPlanName: string;

    @Input()
    public treatmentPlanStaffId: string;

    @Input()
    public treatmentPlanStartDate: string;

    @Input()
    public treatmentPlanEndDate: string;


    // Accordion State
    visitsExpanded = false;
    allergiesExpanded = false;
    medsExpanded = false;
    labsExpanded = false;
    immunizationsExpanded = false;
    treatmentPlanExpanded = false;

    // empty arrays for new data
    newVisits: { date: string; provider: string; dentistNotes: string }[] = [];
    newAllergies: { allergy: string; comment: string }[] = [];
    newMedications: { date: string; medication: string; directions: string }[] = [];
    newLabs: { date: string; lab: string; comment: string }[] = [];
    newImmunizations: { date: string; immunization: string }[] = [];


    constructor(private route: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.checkAccessList(["dentist", "admin"], "/");

        this.populateFields();
    }

    private populateFields(): void {
        let patientId = this.route.snapshot.paramMap.get('id');
        this.apiService.get("/staff/patient-information/" + patientId).subscribe({
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

    // These are methods to push into database, not sure how u gonna do that -- ask caleb

    // Visits methods
    addVisit(): void {
        this.newVisits.push({date: '', provider: '', dentistNotes: ''});
    }

    saveNewVisits(): void {
        this.newVisits = [];
    }

    // Allergies Methods
    addAllergy(): void {
        this.newAllergies.push({allergy: '', comment: ''});
    }

    saveNewAllergies(): void {
        let body = this.newAllergies;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/allergies", body).subscribe({
            next: res => {
                this.populateFields();
                this.newAllergies = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
            }
        });


    }

    // Medications Methods
    addMedication(): void {
        this.newMedications.push({date: '', medication: '', directions: ''});
    }

    saveNewMedications(): void {
        let body = this.newMedications;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/medications", body).subscribe({
            next: res => {
                this.populateFields();
                this.newMedications = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
            }
        });
    }

    // Labs Methods
    addLab(): void {
        this.newLabs.push({date: '', lab: '', comment: ''});
    }

    saveNewLabs(): void {
        let body = this.newLabs;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/labs", body).subscribe({
            next: res => {
                this.populateFields();
                this.newLabs = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
                // this.newLabs = [];
            }
        });
    }

    // Immunizations Methods
    addImmunization(): void {
        this.newImmunizations.push({date: '', immunization: ''});
    }

    saveNewImmunizations(): void {
        let body = this.newImmunizations;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/immunizations", body).subscribe({
            next: res => {
                this.populateFields();
                this.newImmunizations = [];
            },
            error: err => {
                alert("There was an error updating the patient's allergy information.");
                this.newImmunizations = [];
            }
        });
    }

    saveNewTreatmentPlan(): void {
        let body = this.treatmentPlan;
        this.apiService.post("/staff/patient-information/" + this.patientInfo.patient.patientId + "/treatment-plan", body).subscribe({
            error: err => {
                alert("There was an error saving the patient's treatment plan!");
            }
        })
    }

    deleteAllergy(allergyId: string, event: MouseEvent) {
        let element = event.target as Element;
        element.setAttribute("disabled", "true");
        this.apiService.delete("/staff/patient-information/" + this.patientInfo.patient.patientId + "/allergies/" + allergyId, null).subscribe({
            next: res => {
                this.populateFields();
            },
            error: err => {
                element.removeAttribute("disabled");
                alert("There was an error deleting your allergy!")
            }
        });
    }

    deleteMedication(medicationId: string, event: MouseEvent) {
        let element = event.target as Element;
        element.setAttribute("disabled", "true");
        this.apiService.delete("/staff/patient-information/" + this.patientInfo.patient.patientId + "/medications/" + medicationId, null).subscribe({
            next: res => {
                this.populateFields();
            },
            error: err => {
                element.removeAttribute("disabled");
                alert("There was an error deleting your medication!")
            }
        });
    }

    deleteLab(labId: string, event: MouseEvent) {
        let element = event.target as Element;
        element.setAttribute("disabled", "true");
        this.apiService.delete("/staff/patient-information/" + this.patientInfo.patient.patientId + "/labs/" + labId, null).subscribe({
            next: res => {
                this.populateFields();
            },
            error: err => {
                element.removeAttribute("disabled");
                alert("There was an error deleting your lab!")
            }
        });
    }

    deleteImmunization(immunizationId: string, event: MouseEvent) {
        console.log("Deleting allergy" + immunizationId);
        let element = event.target as Element;
        element.setAttribute("disabled", "true");
        this.apiService.delete("/staff/patient-information/" + this.patientInfo.patient.patientId + "/immunizations/" + immunizationId, null).subscribe({
            next: res => {
                this.populateFields();
            },
            error: err => {
                element.removeAttribute("disabled");
                alert("There was an error deleting your medication!")
            }
        });
    }


}
