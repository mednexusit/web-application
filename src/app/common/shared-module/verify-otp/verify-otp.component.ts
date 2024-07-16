import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.scss',
})
export class VerifyOtpComponent implements OnInit {
  @Input() mobNumber: any;
  @Output() closeOtpModal = new EventEmitter();
  @Output() resendNewOtp = new EventEmitter();
  routeFrom:any='';

  isOtpValid: boolean = false;
  otpVal: any;
  constructor(private sharedServ: SharedService, private router: Router, private toastr:ToastrService, private authServ:AuthService) {}

  config = {
    length: 5,
    allowNumbersOnly: true,
    inputClass: 'inp-otp',
  };
  ngOnInit(): void {
    this.sharedServ.getRoute().subscribe((data:any)=>{
      this.routeFrom=data;
      console.log(this.routeFrom);
    })
  }
  onOtpChange(otp: any) {
    this.otpVal = otp;
    if (this.otpVal.length === 5) {
      this.isOtpValid = true;
    } else {
      this.isOtpValid = false;
    }
  }
  verifyOtp() {
    let dataToPass = { mobile: '+91' + this.mobNumber, otp: this.otpVal };
    this.sharedServ.verifyOtp(dataToPass).subscribe({
      next: (data: any) => {
        console.log('Data is ', data);
        let userData={
          userid:data.userid,
          usertype:data.useridtype
        }
        localStorage.setItem('userData',JSON.stringify(userData))
        this.authServ.sendToken(data.access_token);
        if (data.registrationinfo === null && !data.access_token) {
          console.log('OTP Verification Success');
          this.router.navigate(['signup']);
          this.toastr.success('OTP verification Success','',{
            timeOut:1000
          })
        }
        if ( data.access_token) {
          if(this.routeFrom==='/admin'){
            this.router.navigate(['admin/adminhome'])
          }
          if(this.routeFrom==='/userlogin'){
            this.router.navigate(['']);
          }

        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  resendOtp() {
    this.resendNewOtp.emit();
  }
  handleCloseOtp() {
    this.closeOtpModal.emit();
  }
}
