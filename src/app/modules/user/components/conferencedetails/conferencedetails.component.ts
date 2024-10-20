import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';

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

  constructor(
    private ref: MatDialogRef<ConferencedetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    private userServ:UserService
  ) {
    this.conferenceData = data;
  }

  ngOnInit(): void {
    // this.sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(
    //   this.newsFeedDetails[0]?.details
    // );
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
  }
  goBack(){
   // this.userServ.goBack();
    this.ref.close();
  }
  openPersonalDetails() {}
  closeModal() {}
  getSelectedTab(data: MatTabChangeEvent) {
    this.selectedLabel = data.tab.textLabel;
  }
}
