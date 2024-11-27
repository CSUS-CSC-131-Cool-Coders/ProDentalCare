import {Routes} from '@angular/router';
import {LoginPageComponent} from "./account/login-page/login-page.component";
import {ForgotPasswordComponent} from "./account/forgot-password/forgot-password.component";
import {SignupPageComponent} from "./account/signup-page/signup-page.component";
import {ResetPasswordComponent} from "./account/reset-password/reset-password.component";
import {PatientOverviewComponent} from './patient/overview/patient-overview.component';
import {PatientHealthRecords} from './patient/records/health records/health-records.component';
import {PatientTreatmentPlan} from './patient/records/treatment plan/patient-treatment-plan.component';
import {Page2Component} from "./account/signup-page/page-2/page-2.component";

export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "signup", component: SignupPageComponent},
    {path: "signup/page-2", component: Page2Component},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "reset-password", component: LoginPageComponent},
    {path: "reset-password/:resetToken", component: ResetPasswordComponent},
    {path: "overview", component: PatientOverviewComponent}, // Add the route for OverviewComponent
    {path: "records", component: PatientHealthRecords},
    {path: "treatment", component: PatientTreatmentPlan}
];
