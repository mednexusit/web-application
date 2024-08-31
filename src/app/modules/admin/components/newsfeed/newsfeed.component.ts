import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservService } from '../../services/adminserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrl: './newsfeed.component.scss',
})
export class NewsfeedComponent implements OnInit {
  newFeedData: any = [];
  searchTerm: any = '';
  userData: any;
  headText: any = '';
  fileName: any = '';
  isAddNews: boolean = false;
  editUserData: any;
  imgUrl: any = '';
  newsFeedForm: any = FormGroup;
  constructor(
    private router: Router,
    private adminServ: AdminservService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private sharedServ: SharedService
  ) {}
  ngOnInit(): void {
    this.getNewsFeedData();
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.newsFeedForm = this.fb.group({
      heading: ['', Validators.required],
      subheading: ['', Validators.required],
      img_url: ['', Validators.required],
    });
  }

  onFileSelection(file: any) {
    let fileData: File = file.target.files[0];
    this.fileName = fileData.name;
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
  goBackHome(){
    this.router.navigate(['admin/adminhome'])
  }
  getNewsFeedData() {
    this.adminServ.getNewsFeed().subscribe({
      next: (data: any) => {
        this.newFeedData = data.responseContents;
      },
    });
  }
  openModal(data: any) {
    this.newsFeedForm.reset();
    this.imgUrl='';
    this.headText = data;
    this.isAddNews = true;
  }
  openEditModal(data: any) {
    this.headText = 'Edit';
    this.editUserData = data;
    this.isAddNews = true;
    this.newsFeedForm.get('heading').setValue(data.heading);
    this.newsFeedForm.get('subheading').setValue(data.subheading);
    this.newsFeedForm.get('img_url').setValue(data.img_url);
    this.imgUrl = data.img_url;
  }
  closeModal() {
    this.isAddNews = false;
  }
  deleteNewsFeed(data: any) {
    let dataToPass = {
      id: data.id,
      user_type: this.userData.usertype,
      user_id: data.user_id,
    };

    Swal.fire({
      title: 'Do you want to delete it?',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      cancelButtonText: 'No',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      icon: 'question',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.adminServ.deleteNewsFeed(dataToPass).subscribe({
          next: (data: any) => {
            if (data) {
              this.toast.success(data.msg, '', { timeOut: 1000 });
              this.getNewsFeedData();
            }
          },
          error: (err: any) => {
            this.toast.error('Failed to add news feed', '', { timeOut: 1000 });
          },
        });
      }
    });
  }
  submitNewsFeed(data: any) {
    if (this.headText === 'Add') {
      let dataToPass = {
        user_type: this.userData.usertype,
        user_id: this.userData.userid,
        heading: data.heading,
        subheading: data.subheading,
        img_url: data.img_url,
      };
      this.adminServ.createNewsFeed(dataToPass).subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.msg, '', { timeOut: 1000 });
            this.getNewsFeedData();
            this.isAddNews = false;
            this.newsFeedForm.reset();
          }
        },
        error: (err: any) => {
          this.toast.error('Failed to add news feed', '', { timeOut: 1000 });
        },
      });
    }
    if (this.headText === 'Edit') {
      let dataToPass = {
        user_type: this.userData.usertype,
        user_id: this.userData.userid,
        heading: data.heading,
        subheading: data.subheading,
        img_url: data.img_url,
        id: this.editUserData.id,
      };
      this.adminServ.updateNewsFeed(dataToPass).subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.msg, '', { timeOut: 1000 });
            this.getNewsFeedData();
            this.isAddNews = false;
            this.newsFeedForm.reset();
          }
        },
        error: (err: any) => {
          this.toast.error('Failed to add news feed', '', { timeOut: 1000 });
        },
      });
    }
  }
}
