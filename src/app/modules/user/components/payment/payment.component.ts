import { Component, Inject } from '@angular/core';
import { RazorpayserviceService } from '../../services/razorpayservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  paymentData:any;
  constructor( private razorpayserv:RazorpayserviceService,
    private ref: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr:ToastrService
  ){
    this.paymentData = data;
  }
  initiatePayment() {
    const amount = 1; // Amount in INR
    const currency = 'INR';
    this.razorpayserv.openCheckout(this.paymentData.amount,this.paymentData.currency, this.paymentData.userData,(response:any)=>{
      console.log("Payment Success",response);
      if(response.razorpay_payment_id){
        this.toastr.success('Payment Successful', '',{timeOut:1000});
        this.ref.close();
      }
    })
}
}
