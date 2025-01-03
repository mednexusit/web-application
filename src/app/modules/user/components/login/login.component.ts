import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isVerificationStage: boolean = false;
  verificationCode: string[] = ['', '', '', '', ''];
  maskedPhoneNumber: string = '';
  isEnabled: boolean = true;
  userResendOtpData: any;
  tempOtp: any;
  countdown: number = 30; // Start with 30 seconds
  timerSubscription: Subscription | null = null;
  otpGenerated: any;
  config = {
    length: 5,
    allowNumbersOnly: true,
    inputClass: 'inp-otp',
  };

  isOtpValid: boolean = false;
  otpVal: any;

  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private sharedServ: SharedService,
    private router: Router,
    private authServ: AuthService
  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      whatsapp_status: [true],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let whatsAppStatus = this.loginForm.get('whatsapp_status')?.value;
      let dataToPass = {
        mobile: '+91' + this.loginForm.get('mobile')?.value,
        whatsapp_status: whatsAppStatus ? 1 : 0,
      };
      this.userResendOtpData = dataToPass;
      this.sharedServ.userLogin(dataToPass).subscribe({
        next: (data: any) => {
          if (data) {
            this.isVerificationStage = true;
            this.tempOtp = data.otp;
            this.startTimer(); // Start countdown when OTP is sent
            this.toast.success('OTP send for verification', '', {
              timeOut: 1000,
            });
          }
        },
        error: (err: any) => {
          this.toast.error('OTP send Failed', '', { timeOut: 1000 });
        },
      });
    }
  }
  startTimer() {
    this.countdown = 30; // Reset countdown
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe(); // Clear previous timer if exists
    }
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
      }
    });
  }

  onOtpChange(otp: any) {
    this.otpVal = otp;
    if (this.otpVal.length === 5) {
      this.isOtpValid = true;
    } else {
      this.isOtpValid = false;
    }
  }
  maskPhoneNumber(phone: string): string {
    return phone.replace(/(\d{4})(\d{2})(\d{4})/, '$1****$3');
  }
  // getOtpChecked() {
  //   if (this.verificationCode.length) {
  //     this.verificationCode.forEach((item: any) => {
  //       if (item !== '') {
  //         this.isEnabled = false;
  //       } else {
  //         this.isEnabled = true;
  //       }
  //     });
  //   }
  // }

  verifyCodeS() {
    const code = this.otpVal;
    let dataToPass = {
      mobile: '+91' + this.loginForm.get('mobile')?.value,
      otp: code,
    };
    this.sharedServ.verifyOtp(dataToPass).subscribe({
      next: (data: any) => {
        let userData = {
          userid: data.userid,
          usertype: data.useridtype,
        };
        sessionStorage.setItem('userData', JSON.stringify(userData));
        this.authServ.sendToken(data.access_token);
        sessionStorage.setItem('LoggedInUser', JSON.stringify(data.access_token));
        if (data.registrationinfo == null) {
          this.toast.success('Verification Successful', '', { timeOut: 1000 });
          this.router.navigate(['signup']);
        } else {
          this.router.navigate(['dashboard']);
        }
      },
      error: (err: any) => {
        this.toast.error('OTP verification failed', '', { timeOut: 1000 });
      },
    });
  }

  resendCode() {
    if (this.countdown === 0) {
      // Allow resend only when countdown is 0
      this.sharedServ.userLogin(this.userResendOtpData).subscribe({
        next: (data: any) => {
          if (data.status) {
            this.isVerificationStage = true;
            this.startTimer(); // Restart countdown on resend
            this.toast.success('OTP send for verification', '', {
              timeOut: 1000,
            });
          } else {
            this.router.navigate(['signup']);
          }
        },
        error: (err: any) => {
          this.toast.error('OTP send Failed', '', { timeOut: 1000 });
        },
      });
    }
  }

  moveToNext(event: any, nextElement: any) {
    if (event.target.value.length === 1 && nextElement) {
      nextElement.focus();
    }
  }
}
