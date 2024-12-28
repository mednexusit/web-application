import { Injectable } from '@angular/core';
declare var Razorpay: any;
@Injectable({
  providedIn: 'root'
})
export class RazorpayserviceService {

  constructor() {}

  openCheckout(amount: number, currency: string, userData:any, callback: (response: any) => void) {
    const options: any = {
      key: 'rzp_live_62VbjqoDdEAoMw', // Replace with your Razorpay Key ID
      amount: amount * 100, // Convert amount to paisa
      currency: currency,
      name: 'Mednexus',
      description: 'Payment Page',
      image: '', // Replace with your logo URL
      handler: (response: any) => {
        callback(response); // Callback function when payment is successful
      },
      prefill: {
        name: userData.fullname,
        email: userData.email,
        contact: userData.user_reg_mobile,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }
}
