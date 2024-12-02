import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ValidationService} from "../../../validation.service";
import {Router} from "@angular/router";
import {DentalConstants} from "../../../dental-constants";
import {ApiService} from "../../../api.service";

@Component({
    selector: 'app-staff-signup',
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule
    ],
    templateUrl: './staff-signup.component.html',
    styleUrl: '../../login-page/login-page.component.css'
})
export class StaffSignupComponent {
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
    public phoneType = new FormControl("", [
        Validators.required
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

    dob: FormControl = new FormControl("", [
        Validators.required
    ]);

    sex: FormControl = new FormControl("", [
        Validators.required
    ]);

    ssn: FormControl = new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
    ]);

    bankRoutingNo: FormControl = new FormControl("", [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9)
    ]);
    bankAccountNumber: FormControl = new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
    ]);

    public emailMatch: boolean;
    public passwordMatch: boolean;


    public constructor(private validationService: ValidationService,
                       private router: Router,
                       private fb: FormBuilder,
                       private apiService: ApiService) {
        this.form = this.fb.group({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            confirmedEmail: this.confirmedEmail,
            password: this.password,
            confirmedPassword: this.confirmedPassword,
            dob: this.dob,
            sex: this.sex,
            bankRoutingNo: this.bankRoutingNo,
            bankAccNo: this.bankAccountNumber,
            ssn: this.ssn
        });
    }

    submitSignUp() {
        this.emailMatch = this.email.value == this.confirmedEmail.value;
        this.passwordMatch = this.password.value == this.confirmedPassword.value;

        if (!this.emailMatch || !this.passwordMatch) {
            return;
        }

        let payload = this.form.value;

        this.apiService.post<any|null>("/staff/signup", payload).subscribe({
            next: res => {
                alert(res.body);
                this.router.navigateByUrl("/");
            },
            error: err => {
                alert("There was an error processing your information, please try again!");
                this.router.navigateByUrl("/staff/signup");
            }
        });
    }
}
