import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { AdminservService } from '../../services/adminserv.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {Location} from '@angular/common';



@Component({
  selector: 'app-vendorproposals',
  templateUrl: './vendorproposals.component.html',
  styleUrl: './vendorproposals.component.scss'
})
export class VendorproposalsComponent implements OnInit {
  searchterm:string='';
  proposalListData:any=[];
  userType:any;
  vendorProposalDetailData:any=[];
  aboutConferenceData:SafeHtml='';
  aboutLocationData:SafeHtml='';
  aboutSpeakerData:SafeHtml='';
  aboutSchedule:SafeHtml='';
  isModalOpen:boolean=false;
  constructor(private location:Location,private sharedServ:SharedService, private adminServ:AdminservService, private toast:ToastrService, private sanitizer:DomSanitizer){

  }
  ngOnInit(): void {
    this.getVendorProposalDetails();
    this.userType = this.sharedServ.getUserType();
    this.userType = parseInt(this.userType);
  }
  getVendorProposalDetails(){

    let userType = this.sharedServ.getUserType();
    let dataToPass={
      user_type:parseInt(userType)
    }
    this.adminServ.getVendorProposalDetailsList(dataToPass).subscribe({
      next:(data:any)=>{
        this.proposalListData = data.responseContents;
      }
    })
  }
  deleteRequest(data: any) {
    Swal.fire({
      title: 'Do you want to delete this request?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        let dataToPass = {
          vendor_id: data.id,
        };
        this.adminServ.deleteVendorProposalDetails(dataToPass).subscribe({
          next: (data: any) => {
            if (data.responseContents) {
              this.toast.success('Request Deleted Successfully', '', {
                timeOut: 1000,
              });
              this.getVendorProposalDetails();
            }
          },
          error: (err: any) => {
            this.toast.error('Failed to delete', '', { timeOut: 1000 });
          },
        });
      } else {
      }
    });
  }
  closeModal(){
    this.isModalOpen=false;
  }

  openModal(data:any){
    this.vendorProposalDetailData = [data];
    this.aboutConferenceData = this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_conference);
    this.aboutLocationData= this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_location);
    this.aboutSchedule = this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_schedule);
    this.aboutSpeakerData=  this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_speakers);
    this.isModalOpen=true;
  //   let dataToPass={
  //     vendor_id:data.id
  //   }
  //   this.adminServ.getVendorProposalDetail(dataToPass).subscribe({
  //     next:(data:any)=>{
  //       this.vendorProposalDetailData = data.responseContents;
  //       this.aboutConferenceData = this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_conference);
  //       this.aboutLocationData= this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_location);
  //       this.aboutSchedule = this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_schedule);
  //       this.aboutSpeakerData=  this.sanitizer.bypassSecurityTrustHtml(this.vendorProposalDetailData[0]?.about_speakers);
  //     },
  //     error:(err:any)=>{
  //       console.log(err)
  //     }
  //   })
  }

  actionApplied(action:number,id:any){
    let dataToPass={
      vendor_id:parseInt(id),
      status:action
    }
    this.adminServ.acceptRejectVendorProposalDetail(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.toast.success(data.responseContents,'', {timeOut:1000});
          this.isModalOpen=false;
          this.getVendorProposalDetails();
        }
      },
      error:(err:any)=>{
        this.toast.error('Failed to update','',{timeOut:1000})
      }
    })
  }

  goBack(){
    this.location.back();
  }


}
