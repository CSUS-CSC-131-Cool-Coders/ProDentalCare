import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../api.service";
import {filter, Subscription} from "rxjs";

@Component({
    selector: 'app-side-nav',
    standalone: true,
    imports: [
        NgOptimizedImage,
        NgIf
    ],
    templateUrl: './side-nav.component.html',
    styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

    private routerSubscription!: Subscription;

    private routeMap:any[] = [];

    public constructor(protected apiService: ApiService, private router: Router) {

    }

    ngOnInit(): void {
        this.routeMap = [
            {route: 'patient/dashboard', component: 'patientOverview'},
            {route: 'patient/appointments', component: 'patientAppointments'},
            {route: 'patient/records', component: 'patientHealthRecords'},
            {route: 'patient/treatment', component: 'patientTreatmentPlan'},
            {route: 'patient/information', component: 'patientInformation'},
            {route: 'patient/payments', component: 'patientPaymentSummary'},
            {route: 'patient/information', component: 'patientInformation'},
            {route: 'staff/dashboard', component: 'dentistOverview'},
            {route: 'staff/calendar', component: 'dentistCalendar'},
            {route: 'staff/information', component: 'dentistInformation'},
            {route: 'staff/patient', component: 'dentistPatientInformation'},
            {route: 'admin/dashboard', component: 'adminOverview'},
            {route: 'admin/calendar', component: 'adminCalendar'},
            {route: 'admin/staff-information', component: 'adminStaffInformation'},
        ];


        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.handleRoute(event.urlAfterRedirects);
            });
    }

    private handleRoute(path: string) {
        for (let i = 0; i < this.routeMap.length; i++) {
            let route = this.routeMap[i];
            if (path.endsWith(route.route)) {
                this.setActive(route.component);
                break;
            }

        }
    }

    public setActive(element: string) {
        for (let i = 0; i < this.routeMap.length; i++) {
            let e = document.getElementById(this.routeMap[i].component);
            if (e != null) {
                e.className = 'button-wrapper';
            }
        }
        let e = document.getElementById(element);
        if (e != null) {
            e.className = 'button-wrapper button-wrapper-selected';
        }
    }

    public navigate(path: string) {
        this.router.navigateByUrl(path);
        this.handleRoute(path);
    }

}
