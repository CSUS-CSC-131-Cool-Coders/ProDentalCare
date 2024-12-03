import {Routes} from '@angular/router';
import {LoginPageComponent} from "./account/login-page/login-page.component";
import {ForgotPasswordComponent} from "./account/forgot-password/forgot-password.component";
import {SignupPageComponent} from "./account/signup-page/signup-page.component";
import {ResetPasswordComponent} from "./account/reset-password/reset-password.component";
// import {AppointmentSchedulerComponent} from './patient/patient-appointments/appointment-scheduler/appointment-scheduler.component';
import {AdminCalendarComponent} from './admin/admin-calendar/admin-calendar.component';
import {VisitorDashboardComponent} from './dashboard/visitor-dashboard/visitor-dashboard.component';
import {Page2Component} from "./account/signup-page/page-2/page-2.component";
import {PatientOverviewComponent} from './patient/overview/patient-overview.component';
import {PatientHealthRecords} from './patient/records/health records/health-records.component';
import {PatientTreatmentPlan} from './patient/records/treatment plan/patient-treatment-plan.component';
import {PatientInformationComponent} from './patient/patient-information/patient-information.component';
import {StaffSignupComponent} from "./account/signup-page/staff-signup/staff-signup.component";
import {StaffPatientComponent} from './staff/patient information/staff-patient.component';
import {StaffPatientInformationComponent} from './staff/patient information/staff-patient-information.component';
import {AdminStaffInformationComponent} from './admin/staff-information/admin-staff-information.component';
import {StaffInformationComponent} from "./staff-staff info/staff-information.component";
import {PaymentComponent} from "./patient/payments/payment/payment.component";
import {PaymentPageComponent} from "./patient/payments/payment-processing/payment-processing.component";

export const routes: Routes = [
    {path: "", redirectTo: "dashboard", pathMatch: "full"},
    {path: "login", component: LoginPageComponent},
    {path: "signup", component: SignupPageComponent},
    {path: "signup/page-2", component: Page2Component},
    {path: "staff/signup", component: StaffSignupComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "reset-password", component: LoginPageComponent},
    {path: "reset-password/:resetToken", component: ResetPasswordComponent},
    {path: "admin/staff-information", component: StaffInformationComponent},
    {path: "admin/calendar", component: AdminCalendarComponent},
    {path: "reset-password/:resetToken", component: ResetPasswordComponent},
    {path: "dashboard", component: VisitorDashboardComponent},
    {path: "patient/dashboard", component: PatientOverviewComponent}, // Add the route for OverviewComponent
    {path: "patient/records", component: PatientHealthRecords},
    {path: "patient/treatment", component: PatientTreatmentPlan},
    {path: "patient/information", component: PatientInformationComponent},
    {path: "patient/payments/payment", component: PaymentComponent}, //Add route for payments
    {path: "patient/payments/payment-processing", component: PaymentPageComponent}, //Add route for payment process
    {path: 'staff/patient', component: StaffPatientComponent},
    {path: 'staff/patient-information/:id', component: StaffPatientInformationComponent},
    {path: "admin/information", component: AdminStaffInformationComponent},
    {path: "staff/information", component: StaffInformationComponent},
    // {path: "patient/appointments", component: AppointmentSchedulerComponent},
    {path: "staff/calendar", component: AdminCalendarComponent},
    {path: "staff/dashboard", component: VisitorDashboardComponent},
    {path: "admin/dashboard", component: VisitorDashboardComponent}
];
