import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  currentStep = 1;
  personalInfo: any = FormGroup;
  showCMEPoints: boolean = false;
  conferenceInfo: any = FormGroup;
  speakerInfo: any = FormGroup;
  paymentInfo: any = FormGroup;
  categories: any = [
    { name: 'Conference(Online)', id: 1 },
    { name: 'Conference(Offline)', id: 2 },
    { name: 'Workshop', id: 3 },
    { name: 'Expos', id: 4 },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private sharedServ: SharedService,
    private toast: ToastrService
  ) {}
  ngOnInit(): void {
    // this.stepForm = this.formBuilder.group({
    //   step1: ['', Validators.required],
    //   step2: ['', Validators.required],
    //   step3: ['', Validators.required],
    //   step4: ['', Validators.required],
    // });
    this.personalInfo = this.formBuilder.group({
      name: ['', Validators.required],
      age: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.required,
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
    });
    this.conferenceInfo = this.formBuilder.group({
      eventname: ['', Validators.required],
      organisedby: ['', Validators.required],
      category: ['', Validators.required],
      place: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required],
      venu: ['', Validators.required],
    });
    this.speakerInfo = this.formBuilder.group({
      speakerinfo: ['', Validators.required],
      session_name: ['', Validators.required],
      topic: ['', Validators.required],
      speaker_name: ['', Validators.required],
      duration: ['', Validators.required],
      letter: ['', Validators.required],
      cme_point: ['', Validators.required],
    });
    this.paymentInfo = this.formBuilder.group({
      vendorname: ['', Validators.required],
      contactperson: ['', Validators.required],
      contactemail: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      contactphonenumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      bankname: ['', Validators.required],
      branchname: ['', Validators.required],
      accountholdername: ['', Validators.required],
      accountnumber: ['', Validators.required],
      ifsccode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'),
        ]),
      ],
      pan: ['', Validators.compose([Validators.required,Validators.pattern('/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/')])],
      branchaddress: ['', Validators.required],
    });
  }
  changeCurrentStep(data: number) {
    this.currentStep = data;
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
    let dataToPass = {
      name: this.personalInfo.get('name').value,
      age: this.personalInfo.get('age').value,
      gender: this.personalInfo.get('gender').value,
      email: this.personalInfo.get('email').value,
      phone: this.personalInfo.get('phoneNumber').value,
      address: this.personalInfo.get('address').value,
      organizedby: this.conferenceInfo.get('organisedby').value,
      eventname: this.conferenceInfo.get('eventname').value,
      category: parseInt(this.conferenceInfo.get('category').value),
      state: this.conferenceInfo.get('state').value,
      place: this.conferenceInfo.get('place').value,
      pin: this.conferenceInfo.get('pin').value,
      venu: this.conferenceInfo.get('venu').value,
      speakerinfo: this.speakerInfo.get('speakerinfo').value,
      session_name: this.speakerInfo.get('session_name').value,
      topic: this.speakerInfo.get('topic').value,
      speaker_name: this.speakerInfo.get('speaker_name').value,
      duration: this.speakerInfo.get('duration').value,
      letter: this.speakerInfo.get('letter').value,
      cme_point: this.speakerInfo.get('cme_point').value,
      vendorname: this.paymentInfo.get('vendorname').value,
      contactemail: this.paymentInfo.get('contactemail').value,
      contactperson: this.paymentInfo.get('contactperson').value,
      contactphonenumber: this.paymentInfo.get('contactphonenumber').value,
      bankname: this.paymentInfo.get('bankname').value,
      branchname: this.paymentInfo.get('branchname').value,
      accountholdername: this.paymentInfo.get('accountholdername').value,
      accountnumber: this.paymentInfo.get('accountnumber').value,
      ifsccode: this.paymentInfo.get('ifsccode').value,
      panno: this.paymentInfo.get('panno').value,
      branchaddress: this.paymentInfo.get('branchaddress').value,
    };
    this.sharedServ.submitVendorProposalForm(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.message){
          this.toast.success(data.message,'',{timeOut:2000})
          this.paymentInfo.reset();
          this.personalInfo.reset();
          this.conferenceInfo.reset();
          this.speakerInfo.reset();
          this.currentStep=1;
        }
      },
      error:(err:any)=>{
        this.toast.error('Failed to request','try again',{timeOut:1000})
      }
    })
  }
  handleSessionNameFile(file: any) {
    let fileData: File = file.target.files[0];
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData, fileData.name);
      this.sharedServ.uploadFileCommon(formData).subscribe({
        next: (data: any) => {
          if (data.img) {
            this.toast.success(
              `File ${fileData.name} uploaded successfully`,
              '',
              {
                timeOut: 1000,
              }
            );
            this.speakerInfo.get('session_name').setValue(data.img);
          }
        },
        error: (err: any) => {
          this.toast.error('Failed to upload File', '', {
            timeOut: 1000,
          });
        },
      });
    }
  }
  handleLetterField(file: any) {
    let fileData: File = file.target.files[0];
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData, fileData.name);
      this.sharedServ.uploadFileCommon(formData).subscribe({
        next: (data: any) => {
          if (data.img) {
            this.showCMEPoints = true;
            this.toast.success(
              `File ${fileData.name} uploaded successfully`,
              '',
              {
                timeOut: 1000,
              }
            );
            this.speakerInfo.get('letter').setValue(data.img);
          }
        },
        error: (err: any) => {
          this.toast.error('Failed to upload File', '', {
            timeOut: 1000,
          });
        },
      });
    }
  }

}

