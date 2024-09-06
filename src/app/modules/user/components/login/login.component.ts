import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      whatsappNotifications: [true],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.maskedPhoneNumber = this.maskPhoneNumber(formData.phone);
      // Simulate sending code here...
      this.isVerificationStage = true;
    }
  }

  maskPhoneNumber(phone: string): string {
    return phone.replace(/(\d{4})(\d{2})(\d{4})/, '$1****$3');
  }

  verifyCode() {
    const code = this.verificationCode.join('');
    // Implement the verification logic here...
    console.log('Verification code entered:', code);
  }

  resendCode() {
    // Implement code resend logic here...
    console.log('Code resent');
  }
}
