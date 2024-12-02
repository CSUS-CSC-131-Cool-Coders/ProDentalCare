import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router} from "@angular/router";
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
            {route: 'patient/records', component: 'patientHealthRecords'},
            {route: 'patient/treatment', component: 'patientTreatmentPlan'},
            {route: 'patient/information', component: 'patientInformation'} // todo: fill out
        ];


        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                console.log('Route changed to:', event.urlAfterRedirects);

                for (let i = 0; i < this.routeMap.length; i++) {
                    let route = this.routeMap[i];
                    console.log(event.urlAfterRedirects);
                    console.log("route: " + route.route + " component: " + route.component);
                    if (event.urlAfterRedirects.endsWith(route.route)) {
                        this.setActive(route.component);
                        console.log("Setting active");
                        break;
                    }

                }
            });
    }

    public setActive(element: string) {
        for (let i = 0; i < this.routeMap.length; i++) {
            let e = document.getElementById(this.routeMap[i]);
            if (e != null) {
                e.classList.remove('selected-button');
            }
        }
        let e = document.getElementById(element);
        if (e != null) {
            e.classList.add('selected-button');
        }
    }

}
