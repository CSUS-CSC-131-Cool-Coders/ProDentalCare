import {Routes} from '@angular/router';
import {LoginPageComponent} from "./account/login-page/login-page.component";
import {ForgotPasswordComponent} from "./account/forgot-password/forgot-password.component";
import {SignupPageComponent} from "./account/signup-page/signup-page.component";
import {ResetPasswordComponent} from "./account/reset-password/reset-password.component";
import { StaffInformationComponent } from './admin/staff-information/staff-information.component';
import {
  AppointmentSchedulerComponent
} from './patient/patient-appointments/appointment-scheduler/appointment-scheduler.component';
import {AdminCalendarComponent} from './admin/admin-calendar/admin-calendar.component';
import {VisitorDashboardComponent} from './dashboard/visitor-dashboard/visitor-dashboard.component';
import {Page2Component} from "./account/signup-page/page-2/page-2.component";
import {PatientOverviewComponent} from './patient/overview/patient-overview.component';
import {PatientHealthRecords} from './patient/records/health records/health-records.component';
import {PatientTreatmentPlan} from './patient/records/treatment plan/patient-treatment-plan.component';


export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "signup", component: SignupPageComponent},
    {path: "signup/page-2", component: Page2Component},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "reset-password", component: LoginPageComponent},
    {path: "reset-password/:resetToken", component: ResetPasswordComponent},
    {path: "staff-information", component: StaffInformationComponent},
    {path: "patient-appointments", component: AppointmentSchedulerComponent},
    {path: "admin-calendar", component: AdminCalendarComponent}
    {path: "reset-password/:resetToken", component: ResetPasswordComponent},
    {path: "dashboard", component: VisitorDashboardComponent},
    {path: "patient/dashboard", component: PatientOverviewComponent}, // Add the route for OverviewComponent
    {path: "patient/records", component: PatientHealthRecords},
    {path: "patient/treatment", component: PatientTreatmentPlan}
];
