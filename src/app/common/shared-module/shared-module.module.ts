import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent,
    VerifyOtpComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    RouterModule
  ],
  exports:[
    LoginComponent
  ]
})
export class SharedModuleModule { }
