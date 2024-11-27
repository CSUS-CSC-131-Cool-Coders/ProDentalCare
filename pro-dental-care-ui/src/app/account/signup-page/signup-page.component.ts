import {Component, Input} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validators
} from "@angular/forms";
import {ValidationService} from "../../validation.service";
import {Router} from "@angular/router";
import {DentalConstants} from "../../dental-constants";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-signup-page',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgIf
    ],
    templateUrl: './signup-page.component.html',
    styleUrl: '../login-page/login-page.component.css'
})
export class SignupPageComponent {

    public form: FormGroup;

    @Input()
    public firstName = new FormControl("", [
        Validators.required,
        Validators.minLength(2)
    ]);

    @Input()
    public lastName = new FormControl("", [
        Validators.required,
        Validators.minLength(2)
    ]);

    @Input()
    public email = new FormControl("", [
        Validators.required,
        Validators.email,
    ]);

    @Input()
    public confirmedEmail = new FormControl("", [
        Validators.required,
        Validators.email
    ]);

    @Input()
    public phone = new FormControl("", [
        Validators.required,
        Validators.pattern(ValidationService.phonePattern)
    ]);

    @Input()
    public password = new FormControl("", [
        Validators.required,
        Validators.pattern(ValidationService.passwordPattern)
    ]);

    @Input()
    public confirmedPassword = new FormControl("", [
        Validators.required
    ]);

    public emailMatch: boolean;
    public passwordMatch: boolean;

    public constructor(private validationService: ValidationService,
                       private router: Router,
                       private fb: FormBuilder) {
        this.form = this.fb.group({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            confirmedEmail: this.confirmedEmail,
            phone: this.phone,
            password: this.password,
            confirmedPassword: this.confirmedPassword
        });
    }

    submitSignUp() {
        this.emailMatch = this.email.value == this.confirmedEmail.value;
        this.passwordMatch = this.password.value == this.confirmedPassword.value;

        if (!this.emailMatch || !this.passwordMatch) {
            return;
        }

        sessionStorage.setItem(DentalConstants.SIGNUP_SESSION_STORAGE_ID, JSON.stringify(this.form.value));

        this.router.navigateByUrl("/signup/page-2");
    }
}
