import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ApiService} from "../../api.service";

@Component({
    selector: 'app-staff-patient',
    templateUrl: './staff-patient.component.html',
    styleUrls: ['./staff-patient.component.css'],
    standalone: true,
    imports: [CommonModule],
})
export class StaffPatientComponent implements OnInit {
    // connect the huzzz
    patients = [
        {id: 'P001', name: 'John Doe', dob: '1980-06-15'},
        {id: 'P002', name: 'Jane Smith', dob: '1992-11-02'},
        {id: 'P003', name: 'Alice Brown', dob: '1975-03-25'},
    ];

    constructor(private router: Router, private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.get("");
    }

    goToPatientInformation(patientId: string): void {
        // navigate to their info based on id
        this.router.navigate(['/staff/patient-information', patientId]);
    }
}