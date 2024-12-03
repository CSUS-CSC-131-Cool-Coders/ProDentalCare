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
  public accountBalance: string = '0';
  @Input()
  public amountDue: string[] = [];
  @Input()
  public nextDueDate: string;
  @Input()
  public previousPayments: string[] = [];
  @Input()
  public previousPaidDates: string[] = [];

  public totalDue: number = 0;

  public constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.apiService.get("/patient/payments/payment").subscribe({
      next: res => {
          let body: any = res.body;

          this.amountDue = body.currentPayment?.amount || '0';
          if(body.currentPayment?.date != null){
            this.nextDueDate = this.formatDate(body.currentPayment?.date || 'N/A');
          }
          else{
            this.nextDueDate = body.currentPayment?.amount || 'N/A';
          }

          const payments = body.totalPayment || [];
          const unpaidBills = payments.filter((payment: any) => payment.payStatus == 'unpaid');
          const paidBills = payments.filter((payment: any) => payment.payStatus == 'paid');

          if (payments.length > 0) {
            this.totalDue = unpaidBills
              .reduce((sum: number, payment: any) => sum + (payment.payAmount || 0), 0);
          }
          this.accountBalance = this.totalDue.toString(); //Assigns account balance to total unpaid bills

        this.previousPaidDates = paidBills
          .filter((payment: any) => payment.paidDate) //Check if payment has due date
          .map((payment: any) => this.formatDateByMonth(payment.paidDate)) || 'N/A';
        this.previousPayments = paidBills
          .filter((payment: any) => payment.payAmount)
          .map((payment: any) => payment.payAmount || '0'); //Check if payment has payAmount
      },
      error: err => {
        console.log("Error fetching payment information");
      }
    });

  }

  makePayment() {
    this.router.navigateByUrl("/patient/payments/payment-processing");
  }

  private formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  }

  private formatDateByMonth(dateString: string): string {
    const [year, month, day] = dateString.split('T')[0].split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    return date.toLocaleDateString('en-US', options);
  }

}
