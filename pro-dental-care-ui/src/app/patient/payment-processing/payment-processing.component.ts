import {Component, ElementRef, HostListener, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {
  processPayment() {
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
}
