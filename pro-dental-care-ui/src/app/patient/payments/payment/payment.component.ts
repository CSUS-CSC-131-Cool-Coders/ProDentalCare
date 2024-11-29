import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../../../api.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule, NgOptimizedImage],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})

export class PaymentComponent implements OnInit{
  selectedPayment: { amount: number; date: string | null; status: string | null } | null = null;

  @Input()
  public accountBalance: string;
  @Input()
  public amountDue: string;
  @Input()
  public nextDueDate: string;
  @Input()
  public previousPayment: string;


  public constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.get("/patient/payments/payment").subscribe({
      next: res => {
          let body: any = res.body;
          this.accountBalance = body.currentPayment?.amount || 'N/A';
          this.amountDue = body.currentPayment?.amount || 'N/A';
          this.nextDueDate = body.currentPayment?.date || 'N/A';
          this.previousPayment = body.currentPayment?.amount || 'N/A';
          //this.previousPayment = body.previousPayments;
      },
      error: err => {
        console.log("Error fetching payment information");
      }
    });

  }

  makePayment() {
    this.router.navigateByUrl("/patient/payments/process-payment");
  }

  billId: string;
}
