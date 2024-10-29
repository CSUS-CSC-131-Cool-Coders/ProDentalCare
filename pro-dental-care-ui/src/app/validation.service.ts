import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private emailPattern = new RegExp("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$");
  private passwordPattern = new RegExp("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$");
  private phonePattern = new RegExp("^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$");

  constructor() { }

  public validateEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }

  public validatePassword(password: string): boolean {
    return this.passwordPattern.test(password);
  }

  public validatePhone(phone: string): boolean {
    return this.phonePattern.test(phone);
  }
}

