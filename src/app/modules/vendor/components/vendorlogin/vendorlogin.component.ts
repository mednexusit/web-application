import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendorlogin',
  templateUrl: './vendorlogin.component.html',
  styleUrl: './vendorlogin.component.scss'
})
export class VendorloginComponent {
  loginForm: FormGroup;
  displayfirst = "none";
  displaySecond = "none";

  isChangePassword = false;
  IsLoginPage = true;

  otp: string[] = new Array(6).fill('');
  otpArray: any = [0, 1, 2, 3, 4, 5];

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Login Ts code here
    }
  }

  openModal() {
    this.displayfirst = "block";
  }
  forgotModal(){
    this.displaySecond = "block";
  }
  
  onCloseHandled() {
    this.displayfirst = "none";
    
  }
  forgotCloseHandled(){
    this.displaySecond = "none";
    this.displayfirst = "none";
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const target = event.target as HTMLInputElement;
    if (target.value && index < 5) {
      const next = target.nextElementSibling as HTMLInputElement;
      if (next) next.focus();
    }
  }

  submitOtp() {
    const otpCode = this.otp.join('');
    console.log('OTP entered:', otpCode);
    // logic here
  }

  resendOtp() {
    console.log('Resend OTP triggered');
    // logic here
  }

  submitForgotbtn(){
    this.isChangePassword = true;
    this.IsLoginPage = false;
    this.displaySecond = "none";
    this.displayfirst = "none";
  }
}
