import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailNotification: [false],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      course: ['', Validators.required],
      type: ['', Validators.required],
      collegeName: ['', Validators.required],
      year: ['', Validators.required],
      position: ['', Validators.required],
      experience: ['', Validators.required],
      organization: ['', Validators.required],
      councilState: ['', Validators.required],
      medicalRegNo: ['', Validators.required],
      yearOfReg: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
