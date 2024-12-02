import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ValidationService} from "../../../validation.service";
import {DentalConstants} from "../../../dental-constants";
import {Router} from "@angular/router";
import {ApiService} from "../../../api.service";

@Component({
  selector: 'app-page-2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './page-2.component.html',
  styleUrls: ['../../login-page/login-page.component.css']
})
export class Page2Component {

  public form: FormGroup;

  @Input()
  public ssn: FormControl = new FormControl("", [
      Validators.required,
      Validators.pattern(ValidationService.ssnPattern)
  ]);

  @Input()
  public dob  = new FormControl("", [
      Validators.required,
      Validators.max(Date.now())
  ]);

  @Input()
  public sex = new FormControl("", [
      Validators.required,
      Validators.nullValidator
  ]);

  @Input()
  public selectedLang = new FormControl("", [
      Validators.required
  ]);

  @Input()
  public height = new FormControl("", [
    Validators.required,
      Validators.min(0)
  ]);

  @Input()
  public weight = new FormControl("", [
    Validators.required,
    Validators.min(0)
  ]);

  public addressTwo: FormControl= new FormControl("", [
  ]);

  public addressOne: FormControl= new FormControl("", [
    Validators.required,
    Validators.min(2)
  ]);

  public city: FormControl= new FormControl("", [
    Validators.required,
    Validators.min(2)
  ]);

  public state: FormControl= new FormControl("", [
    Validators.required,
      Validators.min(2)
  ]);

  public country: FormControl= new FormControl("", [
    Validators.required,
      Validators.min(4)
  ]);

  public zip: FormControl= new FormControl("", [
    Validators.required,
    Validators.minLength(5),
      Validators.maxLength(5)
  ]);

  public maritalStatus: FormControl= new FormControl("", [
    Validators.required,
      Validators.min(5)
  ]);

  public race: FormControl= new FormControl("", [
    Validators.required
  ]);

  public constructor(private router: Router,
                     private apiService: ApiService,
                     private fb: FormBuilder) {
    this.form = this.fb.group({
      ssn: this.ssn,
      dob: this.dob,
      sex: this.sex,
      lang: this.selectedLang,
      height: this.height,
      weight: this.weight,
      addressOne: this.addressOne,
      addressTwo: this.addressTwo,
      city: this.city,
      state: this.state,
      country: this.country,
      zipCode: this.zip,
      race: this.race,
      maritalStatus: this.maritalStatus
    });
  }

  public langCodes = [
      {
        lang: "English",
        code: "en"
      },
      {
        lang: "Spanish",
        code: "es"
      }];

  public submitSignUp() {

    let page2 = this.form.value;

    let page1Str = sessionStorage.getItem(DentalConstants.SIGNUP_SESSION_STORAGE_ID);

    if (page1Str == null) {
      alert("There was an error processing your information, please try again!");
      this.router.navigateByUrl("/signup");
      return;
    }

    let page1 = JSON.parse(page1Str);

    let payload = Object.assign(page1, page2);

    this.apiService.post<any|null>("/signup", payload).subscribe({
      next: res => {
        this.apiService.post<any|null>("/login", {
          username: payload.email,
          password: payload.password
        }).subscribe({
          next: res => {
            let token = res.body.token;
            this.apiService.setLoginToken(token);
            this.router.navigateByUrl("/");
          },
          error: err => {
            this.router.navigateByUrl("/login");
          }
        });
      },
      error: err => {
        alert("There was an error processing your information, please try again!");
        this.router.navigateByUrl("/signup");
      }
    });

  }

}
