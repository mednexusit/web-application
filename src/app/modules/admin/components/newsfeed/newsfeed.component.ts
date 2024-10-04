import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AdminservService } from '../../services/adminserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../../shared/shared.service';
import Swal from 'sweetalert2';
import { Editor, toDoc, Toolbar } from 'ngx-editor';
import { toHtml } from '@fortawesome/fontawesome-svg-core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrl: './newsfeed.component.scss',
})
export class NewsfeedComponent implements OnInit, AfterViewInit {
  newFeedData: any = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns = ['Sr.No', 'ID', 'Heading', 'Sub-Heading', 'Action'];
  searchTerm: any = '';
  isAddBody: boolean = false;
  userData: any;
  userType: any;
  headText: any = '';
  fileName: any = '';
  isAddNews: boolean = false;
  editUserData: any;
  imageURL: any = '';
  newsData: any;
  imgUrl: any = '';
  newsFeedForm: any = FormGroup;
  editor: any;
  html: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['undo', 'redo'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  newsDetails: any = FormGroup;
  constructor(
    private router: Router,
    private adminServ: AdminservService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private sharedServ: SharedService
  ) {}
  ngOnInit(): void {
    this.editor = new Editor({});
    this.getNewsFeedData();
    this.userType = this.sharedServ.getUserType();
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.newsFeedForm = this.fb.group({
      heading: ['', Validators.required],
      subheading: ['', Validators.required],
      img_url: ['', Validators.required],
    });

    this.newsDetails = this.fb.group({
      details: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Assign paginator after data
    }
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
            this.imageURL = data.img;
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
  goBackHome() {
    this.router.navigate(['admin/adminhome']);
  }
  getNewsFeedData() {
    this.adminServ.getNewsFeed().subscribe({
      next: (data: any) => {
        this.newFeedData = data.responseContents;
        this.dataSource.data = this.newFeedData;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal(data: any) {
    this.newsFeedForm.reset();
    this.imgUrl = '';
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
  getCopyLink() {
    let copyItem = document.getElementById('#imgURL') as HTMLInputElement;
    let imageArea = document.querySelector('.imagearea') as HTMLDivElement;
    copyItem && copyItem.classList.add('blue');
    imageArea && imageArea.classList.add('blue');
    copyItem && copyItem.select();
    navigator.clipboard.writeText(this.imageURL);
    this.toast.success('Link Copied To Clipboard');
  }
  closeModal() {
    this.isAddNews = false;
    this.isAddBody = false;
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

  openBodyModal(data: any) {
    this.isAddBody = true;
    this.newsData = data;
    if (data.details) {
      this.newsDetails.get('details').setValue(data.details);
    }
  }
  submitNewsDetails(data: any) {
    let dataToPass = {
      details: `${data.details}`,
      id: this.newsData.id,
      user_type: parseInt(this.sharedServ.getUserType()),
    };
    this.adminServ.updateNewsBody(dataToPass).subscribe({
      next: (data: any) => {
        if (data.status) {
          this.toast.success(data.msg, '', { timeOut: 1000 });
          this.isAddBody = false;
          this.getNewsFeedData();
          this.newsDetails.reset();
        }
      },
      error: (err) => {
        this.toast.error('Failed to update details', '', { timeOut: 1000 });
      },
    });
  }
}
