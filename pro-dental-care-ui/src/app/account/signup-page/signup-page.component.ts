import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ValidationService} from "../../validation.service";

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

  public constructor(private validationService: ValidationService) {
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

  }
}
