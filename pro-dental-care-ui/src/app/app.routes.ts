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

export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "signup", component: SignupPageComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},
    {path: "reset-password", component: LoginPageComponent},
    {path: "reset-password/:resetToken", component: ResetPasswordComponent},
    {path: "staff-information", component: StaffInformationComponent},
    {path: "patient-appointments", component: AppointmentSchedulerComponent},
  {path: "admin-calendar", component: AdminCalendarComponent}
];
