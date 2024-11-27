import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public static emailPattern = new RegExp("^[\\w\\-\\.]+@([\\w-]+\\.)+[\\w-]{2,}$");
  public static passwordPattern = new RegExp("^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{6,})\\S$");
  public static phonePattern = new RegExp("^(1\\s?)?(\\d{3}|\\(\\d{3}\\))[\\s\\-]?\\d{3}[\\s\\-]?\\d{4}$");
  public static ssnPattern = new RegExp("^\\d{9}$");

  constructor() { }

  public validateEmail(email: string): boolean {
    return ValidationService.emailPattern.test(email);
  }

  public validatePassword(password: string): boolean {
    return ValidationService.passwordPattern.test(password);
  }

  public validatePhone(phone: string): boolean {
    return ValidationService.phonePattern.test(phone);
  }
}

