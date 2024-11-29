import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";
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
  @Input()
  public cardHolder: string;

  @Input()
  public cardNumber: string;

  @Input()
  public expDate: string;

  @Input()
  public cvc: string;

  @Input()
  public address: string;

  @Input()
  public address2: string;

  @Input()
  public city: string;

  @Input()
  public state: string;

  @Input()
  public zipCode: string;

  @Input()
  public accountBalance: string;

  @Input()
  public amountDue: string;

  submitPayment() {
    alert('Processing payment...');
    // Add logic to integrate with Stripe, PayPal, or other payment gateways
  }
  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    if (target.id === 'cardNumber') {
      let inputValue = target.value;

      inputValue = inputValue.replace(/\D/g, ''); //Allow only digits
      inputValue = inputValue.substring(0, 16); //Limit to 16 numbers
      inputValue = inputValue.replace(/(.{4})/g, '$1 '); //Format with space every 4 digits
      inputValue = inputValue.trim();
      target.value = inputValue;
    }
    else if(target.id === 'expiry') {
      let inputValue = target.value;

      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 4);
      if (inputValue.length > 2) {
        inputValue = `${inputValue.substring(0, 2)} / ${inputValue.substring(2)}`;
      }
      target.value = inputValue;
    }
    else if(target.id === 'cvc') {
      let inputValue = target.value;

      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 3);
      target.value = inputValue;
    }
    else if(target.id === 'zipCode') {
      let inputValue = target.value;

      inputValue = inputValue.replace(/\D/g, '');
      inputValue = inputValue.substring(0, 5);
      target.value = inputValue;
    }
  }

  public constructor(private apiService: ApiService) {}

  public ngOnInit(): void {
    this.apiService.checkAccess("patient", "/payment-processing");

    this.apiService.get("").subscribe({
      next: res => {
        let body: any = res.body;
        this.cardHolder = body.cardHolder;
        this.cardNumber = body.cardNumber;
        this.expDate = body.expDate;
        this.cvc = body.cvc;
        this.address = body.address;
        this.address2 = body.address2;
        this.city = body.city;
        this.state = body.state;
        this.zipCode = body.zipCode;

        this.accountBalance = body.nextAppointmentDate;
        this.amountDue = body.treatmentPlan;
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
