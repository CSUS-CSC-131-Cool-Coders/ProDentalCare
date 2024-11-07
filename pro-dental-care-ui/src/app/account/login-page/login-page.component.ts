import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ValidationService} from "../../validation.service";
import {ApiService} from '../../api.service';
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

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

  public constructor(private validationService: ValidationService,
                     private apiService: ApiService,
                     private router: Router) {
  }

  public submitLogin(): void {
    //todo: implement api call
    let body = {
      "username": this.email,
      "password": this.password
    };
    this.apiService.post<any|null>("/example/login", body, (new HttpHeaders()).append("Content-Type", "application/json")).subscribe((res) => {
      if (!ApiService.isOk(res.status)) {
        console.log("could not login!");
        return;
      }

      let token = res.body.token;
      localStorage.setItem("pdc-token", token);

      this.apiService.isLoggedIn = true;

      this.router.navigateByUrl("/").then(r => {});

    });
    console.log("Will implement later");
  }

  validateEmail() {
    this.emailValid = this.validationService.validateEmail(this.email);

  }
}
