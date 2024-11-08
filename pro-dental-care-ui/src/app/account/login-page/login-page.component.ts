import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from '../../api.service';
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {DentalConstants} from "../../dental-constants";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  protected form: FormGroup;

  @Input()
  public email = new FormControl("", [
      Validators.required,
      Validators.email
  ]);

  @Input()
  public password = new FormControl("", [
      Validators.required,
      Validators.minLength(6)
  ]);

  public invalidCredentials: boolean = false;

  public constructor(private apiService: ApiService,
                     private router: Router,
                     private fb: FormBuilder) {
    this.form = this.fb.group({
      username: this.email,
      password: this.password
    });
  }

  public onSubmit(): void {
    this.invalidCredentials = false;

    let body = this.form.value;

    this.apiService.post<any|null>("/login", body).subscribe({
      next: res => {
        let token = res.body.token;

        localStorage.setItem(DentalConstants.TOKEN_LOCAL_STORAGE_ID, token);

        this.apiService.isLoggedIn = true;

        this.router.navigateByUrl("/").then(r => {
        });
      },
      error: err => {
        this.invalidCredentials = true;
        console.log("bad credentials");
      }
    });
  }
}
