import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsfeeddetail',
  templateUrl: './newsfeeddetail.component.html',
  styleUrl: './newsfeeddetail.component.scss',
})
export class NewsfeeddetailComponent implements OnInit {
  newsFeedId: any;
  sanitizedHtml: SafeHtml;
  newsFeedDetails: any;
  isSharing: boolean = false;
  isUserLoggedIn: boolean = false;
  userData: any;
  isFeedLiked:boolean=false;
  displayForm = "none";
  feedbackForm: FormGroup;
  submitted = false;
  showForm = false;
  userDetailsData:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userServ: UserService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
    this.feedbackForm = this.fb.group({
      feedback: ['', [Validators.required, Validators.minLength(5)]]
    });

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

  }

  ngOnInit(): void {

    this.newsFeedId = this.route.snapshot.params['id'];
    if (this.newsFeedId != undefined) {
      this.getNewsFeedData();
    }
    this.checkIsUserLoggedIn();
    this.getUserData();
    this.getUserDetails();
  }
  getUserData() {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
  }
  getUserDetails(){
    let dataToPass={
      user_id:this.userData.userid
    }
    this.userServ.getUserDetails(dataToPass).subscribe({
      next:(data:any)=>{
        this.userDetailsData = data.responseContents;
        this.userDetailsData =  this.userDetailsData[0];
        console.log(this.userDetailsData);
      },
      error:(error:any)=>{
        console.error("Failed to fetch user details");
      }
    })
  }

  checkIsUserLoggedIn() {
    if (sessionStorage.getItem('LoggedInUser')?.length) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }

  goBack() {
    this.router.navigate(['dashboard/education1/news-feed'])
   // this.userServ.goBack();
  }
  getNewsFeedData() {
    this.userServ.getNewsFeedDetails(this.newsFeedId).subscribe({
      next: (data: any) => {
        this.newsFeedDetails = data.responseContents;
        this.newsFeedDetails = [this.newsFeedDetails[0]]
        this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
          this.newsFeedDetails[0]?.details
        );
      },
      error: (err: any) => {
        this.toastr.error('Failed to fetch details', '', {
          timeOut: 2000,
        });
      },
    });
  }
  toggleLikeDislike(){
    this.isFeedLiked= !this.isFeedLiked;
  }
  shareContent(item: any) {
    if (this.isSharing) {
      return;
    }
    this.isSharing = true;
    if (navigator.share) {
      navigator
        .share({
          title: item.heading,
          text: item.subheading,
          url: window.location.href,
        })
        .then(() => {
          console.log('Successfully shared');
          this.isSharing = false; // Reset the flag after successful sharing
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          this.isSharing = false; // Reset the flag if there's an error
        });
    } else {
      alert('Sharing is not supported on this browser.');
      this.isSharing = false; // Reset the flag if the API is not supported
    }
  }
  actionLike(data: any) {
    let dataToPass = {
      newsFeedId: data?.id,
      userid: this.userData.userid,
    };
    this.userServ.likeNewsFeed(dataToPass).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.getNewsFeedData();
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  actionDislike(data: any) {
    let dataToPass = {
      newsFeedId: data?.id,
      userid: this.userData.userid,
    };
    this.userServ.dislikeNewsFeed(dataToPass).subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.getNewsFeedData();
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  toggleForm(){
    this.displayForm = "block";
    this.showForm = !this.showForm;
  }
  closeForm(){
    this.displayForm ="none";
  }
  get f() {
    return this.feedbackForm.controls;
  }
  feedbackFormSubmit(){
    this.submitted = true;
    if (this.feedbackForm.invalid) {
      return;
    }
    let dataToPass={
      "name":this.userDetailsData?.fullname,
      "comment":this.feedbackForm.get('feedback')?.value,
      "email":this.userDetailsData?.email,
      "phone":this.userDetailsData?.user_reg_mobile,
      "specialityid":this.userDetailsData?.course,
      "userid":this.userData.userid
    }
    console.log("Data ToPass",dataToPass)
    this.userServ.submitFeedBack(dataToPass).subscribe({
      next:(data:any)=>{
        this.toastr.success('Feedback has been shared successfully', '', {
          timeOut: 2000,
        });
      },
      error:(error:any)=>{
        this.toastr.error('Failed to share feedback', '', {
          timeOut: 2000,
        });
      }
    })

    console.log('Feedback submitted:', this.feedbackForm.value.feedback);
    // alert(`Thank you for your feedback: ${this.feedbackForm.value.feedback}`);
    this.feedbackForm.reset();
    this.submitted = false;
    this.closeForm()
  }
}
