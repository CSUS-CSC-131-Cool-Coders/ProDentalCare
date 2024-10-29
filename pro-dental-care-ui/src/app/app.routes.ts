import {Routes} from '@angular/router';
import {LoginPageComponent} from "./account/login-page/login-page.component";
import {ForgotPasswordComponent} from "./account/forgot-password/forgot-password.component";
import {SignupPageComponent} from "./account/signup-page/signup-page.component";

export const routes: Routes = [
    {path: "login", component: LoginPageComponent},
    {path: "signup", component: SignupPageComponent},
    {path: "forgot-password", component: ForgotPasswordComponent},

];
