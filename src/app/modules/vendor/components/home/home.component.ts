import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentStep = 1;
  personalInfo: any = FormGroup;
  conferenceInfo:any=FormGroup;
  speakerInfo:any=FormGroup;
  paymentInfo:any=FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    // this.stepForm = this.formBuilder.group({
    //   step1: ['', Validators.required],
    //   step2: ['', Validators.required],
    //   step3: ['', Validators.required],
    //   step4: ['', Validators.required],
    // });
    this.personalInfo=this.formBuilder.group({
      name:['',Validators.required],
      age:[
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      sex:['',Validators.required],
      address:['',Validators.required],
      phoneNumber:['', Validators.compose([Validators.minLength(10),Validators.maxLength(10),Validators.required])],
      email:[
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ]
    })
    this.conferenceInfo=this.formBuilder.group({
      location:['',Validators.required],
      specificCollegeName:[''],
      designAndFormat:['',Validators.required],
      conferenceBrochure:['',Validators.required]
    })
    this.speakerInfo=this.formBuilder.group({
      speakerDetails:['',Validators.required],
      sessionDetails:['',Validators.required]
    })
    this.paymentInfo= this.formBuilder.group({
      vendorName:['',Validators.required],
      conferenceName:['',Validators.required],
      contactPerson:['',Validators.required],
      contactEmail:['',Validators.required],
      contactPhoneNumber:['',Validators.required],
      bankName:['',Validators.required],
      branchName:['',Validators.required],
      accountHolderName:['',Validators.required],
      accountNumber:['',Validators.required],
      ifsccode:['',Validators.required],
      swiftcode:['',Validators.required],
      branchAddress:['',Validators.required]
    })
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.personalInfo.valid) {
      console.log('Stepper completed', this.personalInfo.value);
    }
  }
}
