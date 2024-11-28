import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RazorpayserviceService } from '../../services/razorpayservice.service';
import { PaymentComponent } from '../payment/payment.component';


@Component({
  selector: 'app-conferencedetails',
  templateUrl: './conferencedetails.component.html',
  styleUrl: './conferencedetails.component.scss',
})
export class ConferencedetailsComponent implements OnInit {
  conferenceData: any;
  selectedLabel: any = 'aboutconference';
  sanitizedHtmlAboutConference: SafeHtml;
  sanitizedHTMLAboutSpeaker: SafeHtml;
  sanitizedHTMLAboutSchedule: SafeHtml;
  sanitizedHTMLAboutLocation: SafeHtml;
  sanitizedHTMLAboutPersonal: SafeHtml;
  participantsData: any = [];
  userData: any;
  userDetailsData:any;
  isOpenAddMemeber: boolean = false;
  editData: any;
  selectedParticipants:any=[];

  addMemberForm: any = FormGroup;
  addEditLabel: string = 'Add';
  gender: any = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 },
  ];
  constructor(
    private toastr: ToastrService,
    private ref: MatDialogRef<ConferencedetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private userServ: UserService,
    private fb: FormBuilder,
    private router: Router,
    private razorpayserv:RazorpayserviceService,
    public dialog: MatDialog
  ) {
    this.conferenceData = data;
  }

  ngOnInit(): void {

    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.getUserDetails(this.userData);
    //this.fetchBookingConfirmationList();
    // this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
    //   this.newsFeedDetails[0]?.details
    // );
    this.addMemberForm = this.fb.group({
      user_uuid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile_number: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      mbbs: [''],
      postgraduation: [''],
      superspecialty: [''],
      current_position: [''],
      exporstudiing_year: [''],
      current_working_or_studying: [''],
      council_state: [''],
      council_reg: [''],
      yearofstudying: [''],
      yearofpracticing: [''],
      medRegisterNum: [''],
    });

    this.getParticipants();
    this.sanitizedHtmlAboutConference = this.sanitizer.bypassSecurityTrustHtml(
      this.conferenceData.about_conference
    );
    this.sanitizedHTMLAboutSchedule = this.sanitizer.bypassSecurityTrustHtml(
      this.conferenceData.about_schedule
    );
    this.sanitizedHTMLAboutSpeaker = this.sanitizer.bypassSecurityTrustHtml(
      this.conferenceData.about_speakers
    );
    this.sanitizedHTMLAboutLocation = this.sanitizer.bypassSecurityTrustHtml(
      this.conferenceData.about_location
    );
    this.sanitizedHTMLAboutPersonal = this.sanitizer.bypassSecurityTrustHtml(
      this.conferenceData.about_personal
    );
  }
  goBack() {
    // this.userServ.goBack();
    this.ref.close();
  }
  openPersonalDetails() {}
  closeModal() {
    this.ref.close();
  }
  getSelectedTab(data: MatTabChangeEvent) {
    this.selectedLabel = data.tab.textLabel;
  }

  getUserDetails(data: any) {
    if (data?.userid) {
      let dataToPass = {
        user_id: data.userid,
      };
      this.userServ.getUserDetails(dataToPass).subscribe({
        next: (data: any) => {
          this.userDetailsData = data.responseContents;
          this.userDetailsData = this.userDetailsData[0];
          if (this.userDetailsData[0]?.course) {
            // this.getUserSpecialities();
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  deleteParticipant(data: any) {
    let dataToPass = {
      id: data.id,
      user_uuid: data.user_uuid,
    };
    this.userServ.deleteParticipant(dataToPass).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.getParticipants();
          this.toastr.success('Deleted Successfully', '', { timeOut: 1000 });
        }
      },
      error: (err: any) => {
        console.error(err);
        this.toastr.error('Server Error', 'Failed to delete', {
          timeOut: 1000,
        });
      },
    });
  }

  getParticipants() {
    let dataToPass = {
      user_uuid: this.userData.userid,
    };
    this.userServ.fetchParticipant(dataToPass).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.participantsData = data.responseContents;
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  openAddMember(type: any, data: any) {
    this.editData = data;
    this.isOpenAddMemeber = true;
    if (type === 'Add') {
      this.addEditLabel = 'Add';
      this.addMemberForm.reset();
    }
    if (type === 'Edit') {
      this.addEditLabel = 'Update';
      this.addMemberForm.patchValue({
        user_uuid: data.user_uuid,
        name: data.name,
        email: data.email,
        mobile_number: data.mobile_number,
        age: data.age,
        gender: data.gender,
        mbbs: data.mbbs,
        postgraduation: data.postgraduation,
        superspecialty: data.superspecialty,
        current_position: data.current_position,
        exporstudiing_year: data.exporstudiing_year,
        current_working_or_studying: data.current_working_or_studying,
        council_state: data.council_state,
        council_reg: data.council_reg,
        yearofstudying: data.yearofstudying,
        yearofpracticing: data.yearofpracticing,
        medRegisterNum: data.medRegisterNum,
      });
    }
  }
  closeModals() {
    this.isOpenAddMemeber = false;
  }
  addParticipant(data: any) {
    data.user_uuid = this.userData.userid;
    data.age = parseInt(data.age);
    data.gender = parseInt(data.gender);
    this.userServ.addParticipant(data).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.toastr.success('Added', '', { timeOut: 1000 });
          this.addMemberForm.reset();
          this.getParticipants();
          this.closeModals();
        }
      },
      error: (err: any) => {
        this.toastr.error('Failed', '', { timeOut: 1000 });
      },
    });
  }
  updateParticipant(data: any) {
    data.id = parseInt(this.editData.id);
    data.user_uuid = this.userData.userid;
    data.age = parseInt(data.age);
    data.gender = parseInt(data.gender);
    this.userServ.editParticipant(data).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.toastr.success('Updated', '', { timeOut: 1000 });
          this.addMemberForm.reset();
          this.getParticipants();
          this.closeModals();
        }
      },
      error: (err: any) => {
        this.toastr.error('Failed', '', { timeOut: 1000 });
      },
    });
  }
  getSelectedParticipants(event:any,data:any){
    if(event.target.checked){
      this.selectedParticipants.push(data);
    }
    else{
      this.selectedParticipants.pop(data);
    }

  }
  confirmBooking() {
    let data={
      amount:1,
      currency:'INR',
      userData:this.userDetailsData
    }
    const dialogRef = this.dialog.open(PaymentComponent,{
      data:data,
      height: "calc(100%)",
      width: "calc(100%)",
      maxWidth: "100%",
      maxHeight: "100%"
    })
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Dialog result:', result);
      this.ref.close();
      // Trigger your function here
      this.confirmBookingAfterPayment();

    });


  }
  confirmBookingAfterPayment(){
    let dataToPass = {
      user_id: this.userData.userid,
      conference_id: this.conferenceData.conference_id,
    };
    this.userServ.bookingConfirmation(dataToPass).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.toastr.success('Booking Confirmed', '', { timeOut: 2000 });
          this.ref.close();
          this.closeModal();
          this.closeModals();
        }
      },
      error: (err: any) => {
        this.toastr.error('Failed', '', { timeOut: 1000 });
      },
    });
  }
  goToAddMember() {
    this.ref.close();
    this.router.navigate(['/dashboard/myprofile']);
  }
  generateRandomOrderId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let orderId = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      orderId += characters[randomIndex];
    }
    return orderId;
  }
//    initiatePayment() {
//     const amount = 500; // Amount in INR
//     const currency = 'INR';
//     this.razorpayserv.openCheckout(amount,currency, this.userDetailsData,(response:any)=>{
//       console.log("Payment Success",response);
//     })
// }

}
