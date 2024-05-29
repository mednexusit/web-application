import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  userLoginForm:any=FormGroup;
  constructor(private fb: FormBuilder, public route: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userLoginForm = this.fb.group({
      mobile:['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^\d{10}$/)])]
    })
  }
  loginAdmin(data: any) {
    console.log(data);
  }
  userLogin(data:any){
    console.log(data)
  }
}
