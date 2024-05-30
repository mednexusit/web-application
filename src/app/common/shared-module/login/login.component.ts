import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  userLoginForm:any=FormGroup;
  mobNumberVal:any;
  isShowVerifyOtp:boolean=false;
  constructor(private fb: FormBuilder, public route: Router, private sharedServ:SharedService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userLoginForm = this.fb.group({
      mobile:['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^\d{10}$/)])],
      whatsapp_status:[true]
    })
    this.userLoginForm.get('whatsapp_status').valueChanges.subscribe((data:any)=>{
      console.log("Sata",data);
    })
  }
  loginAdmin(data: any) {
    console.log(data);
  }
  userLogin(data:any){
    this.mobNumberVal = data.mobile;
    let dataToPass={
      mobile:'+91'+data.mobile,
      whatsapp_status:data.whatsapp_status ? 1 : 0
    }
    this.sharedServ.userLogin(dataToPass).subscribe({
      next:(data:any)=>{
        console.log("Data is",data);
        this.isShowVerifyOtp=true;
      },
      error:(err:any)=>{
        this.isShowVerifyOtp=false;
      }
    })
  }
  resendOtp(){
    this.userLogin(this.userLoginForm.value)
  }
  closeVerifyOtpModal(){
    this.isShowVerifyOtp=false;
  }
}
