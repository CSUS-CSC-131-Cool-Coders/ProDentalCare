import {Component, Input} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ValidationService} from "../../validation.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../login-page/login-page.component.css'
})
export class ForgotPasswordComponent {

  @Input()
  public email: string;

  public emailValid: boolean = true;

  public constructor(private validationService: ValidationService) {
  }

  public validateEmail() {
    this.emailValid = this.validationService.validateEmail(this.email);
  }

  public sendForgotPasswordEmail() {

  }
}
