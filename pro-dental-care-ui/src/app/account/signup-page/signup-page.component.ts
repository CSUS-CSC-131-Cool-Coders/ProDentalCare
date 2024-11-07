import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ValidationService} from "../../validation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: '../login-page/login-page.component.css'
})
export class SignupPageComponent {

  @Input()
  public emailValid: boolean = true;

  @Input()
  public passwordValid: boolean = true;

  @Input()
  public phoneValid: boolean = true;

  @Input()
  public firstName: string = "";

  @Input()
  public lastName: string = "";

  @Input()
  public email: string = "";

  @Input()
  public confirmedEmail: string = "";

  @Input()
  public phone: string = "";

  @Input()
  public password: string = "";

  @Input()
  public confirmedPassword: string = "";

  public constructor(private validationService: ValidationService,
                     private router: Router) {
  }

  validateEmail() {
    this.emailValid = this.validationService.validateEmail(this.email);
  }

  validatePassword() {
    this.passwordValid = this.validationService.validatePassword(this.password);
  }


  validatePhone() {
    this.phoneValid = this.validationService.validatePhone(this.phone);
  }

  submitSignUp() {
    if (!this.emailValid || !this.passwordValid || !this.phoneValid || this.password != this.confirmedPassword || this.email != this.confirmedEmail) {
      alert("Please continue filling out the form!");
      return;
    }

    if (this.email == "" || this.password == "" || this.firstName == "" || this.lastName == "" || this.phone == "") {
      alert("Please continue filling out the signup form!");
      return;
    }


    let signupForm1Details = {
      email: this.email,
      password: this.password,
      phone: this.phone,
      firstName: this.firstName,
      lastName: this.lastName
    };

    sessionStorage.setItem("pdc-signup-form1-details", JSON.stringify(signupForm1Details));

    this.router.navigateByUrl("/signup/page-2");
  }
}
