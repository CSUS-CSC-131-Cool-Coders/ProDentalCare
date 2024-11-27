import {Component, Input, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ValidationService} from "../../validation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: '../login-page/login-page.component.css'
})
export class ResetPasswordComponent implements OnInit {

  @Input()
  public passwordValid: boolean = true;

  @Input()
  public password: string = ""

  @Input()
  public confirmedPassword: string = "";

  private resetToken: string | null;

  public constructor(private validationService: ValidationService, private route: ActivatedRoute) {}

  public validatePassword() {
    this.passwordValid = this.validationService.validatePassword(this.password);
  }

  public resetPassword() {
    //todo: make api call to reset password
    console.log("To be implemented")
  }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.paramMap.get("resetToken");
    console.log("reset token: " + this.resetToken);
  }
}
