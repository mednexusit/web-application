import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservService } from '../../services/adminserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrl: './newsfeed.component.scss',
})
export class NewsfeedComponent implements OnInit {
  newFeedData:any=[];
  searchTerm:any='';
  userData:any;
  headText:any='';
  fileName:any='';
  isAddNews:boolean=false;
  newsFeedForm:any= FormGroup;
  constructor(private router:Router, private adminServ:AdminservService, private fb:FormBuilder, private toast:ToastrService,
    private sharedServ:SharedService
  ){

  }
  ngOnInit(): void {
    this.getNewsFeedData();
    this.userData= localStorage.getItem("userData");
    this.userData= JSON.parse(this.userData);
    this.newsFeedForm = this.fb.group({
      heading:['',Validators.required],
      subheading:['',Validators.required],
      img_url:['',Validators.required]
    })

  }

  onFileSelection(file:any){
    let fileData: File = file.target.files[0];
    this.fileName= fileData.name;
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
            this.newsFeedForm.get('img_url').setValue(data.img);
            this.newsFeedForm.get('img_url').updateValueAndValidity();
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

  getNewsFeedData(){
    this.adminServ.getNewsFeed().subscribe({
      next:(data:any)=>{
        this.newFeedData=data.responseContents;
        console.log("data",this.newFeedData)
      }
    })
  }
  openModal(data:any){
    this.headText=data;
    this.isAddNews=true;
    if(data==='add'){

    }
  }
  closeModal(){
    this.isAddNews=false;
  }
  deleteNewsFeed(data:any){

  }
  submitNewsFeed(data:any){
    console.log(data);
    let dataToPass={
      user_type:this.userData.usertype,
      user_id:this.userData.userid,
      heading:data.heading,
      subheading:data.subheading,
      img_url:data.img_url
    }
    console.log(dataToPass)
    this.adminServ.createNewsFeed(dataToPass).subscribe({
      next:(data:any)=>{
        if(data){
          this.toast.success('News Feed Added SuccessFully','',{timeOut:1000})
          this.getNewsFeedData();
          this.isAddNews=false;
          this.newsFeedForm.reset();
        }
      },
      error:(err:any)=>{
        this.toast.error("Failed to add news feed",'',{timeOut:1000})
      }
    })
  }



}
