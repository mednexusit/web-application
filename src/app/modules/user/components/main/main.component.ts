import { Component } from '@angular/core';
import { ThememanageService } from '../../theme/thememanage.service';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  homeIcon: string;
  aboutIcon: string;
  communitiesIcon: string;
  conferenceIcon: string;
  educationIcon: string;
  contactIcon: string;

  constructor(
    private themeServ: ThememanageService,
    private sharedServ: SharedService
  ) {
    this.sharedServ.getTheme().subscribe((data: any) => {
      this.homeIcon = this.themeServ.getHomeIcon();
      this.aboutIcon = this.themeServ.getAboutIcon();
      this.communitiesIcon = this.themeServ.getCommIcon();
      this.conferenceIcon = this.themeServ.getConfIcon();
      this.educationIcon = this.themeServ.getEduIcon();
      this.contactIcon = this.themeServ.getContactIcon();
    });
    this.homeIcon = this.themeServ.getHomeIcon();
    this.aboutIcon = this.themeServ.getAboutIcon();
    this.communitiesIcon = this.themeServ.getCommIcon();
    this.conferenceIcon = this.themeServ.getConfIcon();
    this.educationIcon = this.themeServ.getEduIcon();
    this.contactIcon = this.themeServ.getContactIcon();
  }
  categories: any = [
    { name: 'My Profile', value: 'profile', icon: 'fa-solid fa-user catIcon' },
    {
      name: 'Conferences',
      value: 'conferences',
      icon: 'fa-solid fa-users catIcon',
    },
    {
      name: 'Professional Credentials',
      value: 'credentials',
      icon: 'fa-solid fa-lock catIcon',
    },
    {
      name: 'CME Tracker',
      value: 'cmetracker',
      icon: 'fa-solid fa-map-pin catIcon',
    },
    {
      name: 'Certificates',
      value: 'certificates',
      icon: 'fa-solid fa-certificate catIcon',
    },
    {
      name: 'News Feeds',
      value: 'newsfeeds',
      icon: 'fa-solid fa-newspaper catIcon',
    },
  ];
}
