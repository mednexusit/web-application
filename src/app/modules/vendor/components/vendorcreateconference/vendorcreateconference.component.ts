import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendorcreateconference',
  templateUrl: './vendorcreateconference.component.html',
  styleUrl: './vendorcreateconference.component.scss'
})
export class VendorcreateconferenceComponent {
  Confform: FormGroup;

  constructor(private formbuild: FormBuilder){
    this.Confform = this.formbuild.group({
      conferenceName: ['', Validators.required],
      speciality: ['', Validators.required],
      location: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      startDate: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {}
  onSubmit(): void {
    if (this.Confform.valid) {
      console.log(this.Confform.value);
      // Process the form data here
    }
  }

  onCancel(): void {
    this.Confform.reset();
  }
}
