import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
//import {ApiService} from '../../api.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
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

  public constructor(private router: Router) {
  }


  submitPayment() {
    this.router.navigateByUrl("/patient/process-payment");
  }

}
