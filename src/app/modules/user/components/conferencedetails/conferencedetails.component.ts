import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  sanitizedHTMLAboutPersonal:SafeHtml;
  participantsData:any=[];
  userData:any;
  isOpenAddMemeber:boolean=false;
  editData:any;

  addMemberForm:any=FormGroup;
  addEditLabel:string='Add';
  gender:any=[{label:'Male',value:1},{label:"Female",value:2}];
  constructor(
    private toastr:ToastrService,
    private ref: MatDialogRef<ConferencedetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private userServ:UserService,
    private fb:FormBuilder
  ) {
    this.conferenceData = data;
    console.log("conference Data",this.conferenceData);
  }


  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    //this.fetchBookingConfirmationList();
    // this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
    //   this.newsFeedDetails[0]?.details
    // );
    this.addMemberForm = this.fb.group({
      "user_uuid":['',Validators.required],
      "name":['',Validators.required],
      "email":['',Validators.compose([Validators.required,Validators.email])],
      "mobile_number":['',Validators.required],
      "age":['',Validators.required],
      "gender":['',Validators.required],
      "mbbs":[''],
      "postgraduation":[''],
      "superspecialty":[''],
      "current_position":[''],
      "exporstudiing_year":[''],
      "current_working_or_studying":[''],
      "council_state":[''],
      "council_reg":[''],
      "yearofstudying":[''],
      "yearofpracticing":[''],
      "medRegisterNum":['']
    })

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
    )
  }
  goBack(){
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




  deleteParticipant(data:any){
    console.log("Delete",data);
    let dataToPass={
      "id": data.id,
      "user_uuid": data.user_uuid
    }
    this.userServ.deleteParticipant(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.getParticipants();
          this.toastr.success('Deleted Successfully','',{timeOut:1000});
        }
      }
      ,error:(err:any)=>{
        console.error(err);
        this.toastr.error('Server Error','Failed to delete',{timeOut:1000});
      }
    })
  }

  getParticipants(){
    let dataToPass={
      user_uuid:this.userData.userid
    }
    this.userServ.fetchParticipant(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.participantsData = data.responseContents;
          console.log("patr",this.participantsData)
        }
      }
      ,error:(err:any)=>{
        console.error(err)
      }
    })
  }
  openAddMember(type:any,data:any){
    console.log("Event",data);
    this.editData = data;
    this.isOpenAddMemeber =true;
    if(type==='Add'){
      this.addEditLabel ='Add';
      this.addMemberForm.reset();
    }
    if(type==='Edit'){
      console.log(data)
      this.addEditLabel= 'Update';
      this.addMemberForm.patchValue({
        user_uuid:data.user_uuid,
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
        medRegisterNum: data.medRegisterNum
      });
    }

  }
  closeModals(){
    this.isOpenAddMemeber=false;
  }
  addParticipant(data:any){
    data.user_uuid = this.userData.userid;
    data.age= parseInt(data.age);
    data.gender= parseInt(data.gender);
    this.userServ.addParticipant(data).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.toastr.success('Added','',{timeOut:1000});
          this.addMemberForm.reset();
          this.getParticipants();
          this.closeModals();

        }
      },
      error:(err:any)=>{
        this.toastr.error('Failed','',{timeOut:1000});
      }
    })
  }
  updateParticipant(data:any){
    data.id=parseInt(this.editData.id)
    data.user_uuid = this.userData.userid;
    data.age= parseInt(data.age);
    data.gender= parseInt(data.gender);
    this.userServ.editParticipant(data).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.toastr.success('Updated','',{timeOut:1000});
          this.addMemberForm.reset();
          this.getParticipants();
          this.closeModals();

        }
      },
      error:(err:any)=>{
        this.toastr.error('Failed','',{timeOut:1000});
      }
    })
  }
  confirmBooking(){
    let dataToPass={
      "user_id":this.userData.userid,
      "conference_id":this.conferenceData.conference_id
    }
    this.userServ.bookingConfirmation(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.toastr.success('Booking Confirmed','',{timeOut:1000});
          this.closeModal();
          this.closeModals();
        }
      },
      error:(err:any)=>{
        this.toastr.error('Failed','',{timeOut:1000});
      }
    })
  }
}
