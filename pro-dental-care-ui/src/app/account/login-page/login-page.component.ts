import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ValidationService} from "../../validation.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  @Input()
  public email: string;

  @Input()
  public password: string;

  @Input()
  public emailValid: boolean = true;

  public constructor(private validationService: ValidationService) {
  }

  submitLogin() {
    //todo: implement api call
    console.log("Will implement later");
  }

  validateEmail() {
    this.emailValid = this.validationService.validateEmail(this.email);

  }
}
