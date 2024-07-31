import { Component } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';
import { ThememanageService } from '../../theme/thememanage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

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

}
