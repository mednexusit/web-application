import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private router: Router,
    private userServ: UserService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
  }

  ngOnInit(): void {
    this.newsFeedId = this.route.snapshot.params['id'];
    if (this.newsFeedId != undefined) {
      this.getNewsFeedData();
    }
  }

  goBack() {
    this.userServ.goBack();
  }
  getNewsFeedData() {
    this.userServ.getNewsFeedDetails(this.newsFeedId).subscribe({
      next: (data: any) => {
        this.newsFeedDetails = data.responseContents;
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
  shareContent(item: any) {
    // Check if a sharing action is already in progress
    if (this.isSharing) {
      return; // Prevent additional share attempts
    }

    // Set the flag to true when the sharing action starts
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
}
