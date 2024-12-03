import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from "@angular/common";
import {Router} from '@angular/router';
import {ApiService} from '../../../api.service';


@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './payment-processing.component.html',
  styleUrl: './payment-processing.component.css'
})
export class PaymentPageComponent implements OnInit {
  public form: FormGroup;

  @Input()
  public cardHolder: FormControl = new FormControl("", [
    Validators.required
  ]);

  @Input()
  public cardNumber: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(19),
    Validators.maxLength(20)
  ]);

  @Input()
  public expDate: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(7),
    Validators.maxLength(8)
  ]);

  @Input()
  public cvc: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(4)
  ]);

  @Input()
  public address: FormControl = new FormControl("", [
    Validators.required
  ]);

  @Input()
  public address2: FormControl = new FormControl("", [
  ]);

  @Input()
  public city: FormControl = new FormControl("", [
    Validators.required
  ]);

  @Input()
  public state: FormControl = new FormControl("", [
    Validators.required
  ]);

  @Input()
  public zip: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(6)
  ]);

  @Input()
  public payAmount: FormControl = new FormControl("", [
    Validators.required
  ]);

  @Input()
  public accountBalance: string;

  @Input()
  public amountDue: string;


  public totalDue: number = 0;

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    let inputValue = target.value;
    if (target.id === 'cardNumber') {
      inputValue = inputValue.replace(/\D/g, ''); //Allow only digits
      inputValue = inputValue.substring(0, 16); //Limit to 16 numbers
      inputValue = inputValue.replace(/(.{4})/g, '$1 '); //Format with space every 4 digits
      inputValue = inputValue.trim();
      target.value = inputValue;
      this.cardNumber.setValue(inputValue);
    }
    else if(target.id === 'expiry') {
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 4);
      if (inputValue.length > 2) {
        inputValue = `${inputValue.substring(0, 2)} / ${inputValue.substring(2)}`;
      }
      target.value = inputValue;
      this.expDate.setValue(inputValue);
    }
    else if(target.id === 'cvc') {
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 3);
      target.value = inputValue;
      this.cvc.setValue(inputValue);
    }
    else if(target.id === 'zip') {
      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 5);
      target.value = inputValue;
      this.zip.setValue(inputValue);
    }
  }

  public constructor(private apiService: ApiService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      cardHolder: this.cardHolder,
      cardNumber: this.cardNumber,
      expDate: this.expDate,
      cvc: this.cvc,
      address: this.address,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zip: this.zip,
      payAmount: this.payAmount
    });
  }

  public ngOnInit(): void {
    this.apiService.get("/patient/payments/payment-processing").subscribe({
      next: res => {
        let body: any = res.body;
        const payments = body.totalPayment || [];
        const unpaidBills = payments.filter((payment: any) => payment.payStatus == 'unpaid');

        if (payments.length > 0) {
          this.totalDue = unpaidBills
            .reduce((sum: number, payment: any) => sum + (payment.payAmount || 0), 0);
        }
        this.accountBalance = this.totalDue.toString();
        this.amountDue = body.currentPayment?.amount || 'N/A';
        console.log("Amount Due: ",this.amountDue);
        console.log("Account Balance: ",this.accountBalance);
      }
    });
  }

  submitPayment() {
    let body = this.form.value;
    if (body.cardNumber) {
      body.cardNumber = body.cardNumber.replace(/\s+/g, '');  //Remove spaces
    }
    if (body.expDate) {
      const cleanedExpDate = body.expDate.replace(/\s+/g, ''); //Remove spaces
      const [month, year] = cleanedExpDate.split('/');  //Separate variables by backlash
      if (month && year) {
        const formattedYear = `20${year}`; //Convert to four-digit year
        body.expDate = `${formattedYear}-${month.padStart(2, '0')}-02`; //Format with 02 day since it subtracts by 1
      }
    }

    const paymentOption = this.payAmount.value;
    body.paymentOption = paymentOption;
    if (paymentOption === 'accountBalance') {
      body.payAmount = this.accountBalance; //Use account balance
    } else if (paymentOption === 'amountDue') {
      body.payAmount = this.amountDue; //Use amount due
    } else {
      console.error("Invalid payment option selected:", paymentOption);
      return;
    }

    console.log("Selected Payment Amount:", body.payAmount);

    this.apiService.post("/patient/payments/payment-processing", body).subscribe({
      next: res=> {
        console.log("Payment successfully submitted.");
        this.router.navigateByUrl("/patient/payments/payment");
      },
      error: err => {
        console.log(err);
      }
    });


  }
}
