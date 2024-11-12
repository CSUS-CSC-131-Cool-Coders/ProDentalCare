import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})

export class PaymentComponent {

  @Input()
  public cardHolder: string = "";

  @Input()
  public cardNumber: number = 0;

  @Input()
  public expDate: Date = new Date();

  @Input()
  public cvc: number = 999;

  @Input()
  public address: string = "";

  @Input()
  public city: string = "";

  @Input()
  public state: string = "";

  @Input()
  public zipCode: number = 99999;

  submitPayment() {
    //TODO - Call API 
    console.log('Payment submitted');
  }
}
