import { SharedService } from './../../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { ThememanageService } from '../../theme/thememanage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;
  logoSrc: string;
  userLogoSrc:string;
  toggleLogoSrc:string;


  constructor(private themeService: ThememanageService, private SharedService:SharedService) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc=this.themeService.getUserLogo();
    this.toggleLogoSrc=this.themeService.getToggleLogo();
  }
  ngOnInit(): void {

  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme);
    this.SharedService.sendTheme(this.isDarkTheme);
    this.logoSrc = this.themeService.getLogo();
    this.toggleLogoSrc=this.themeService.getToggleLogo();
    this.userLogoSrc=this.themeService.getUserLogo();
  }


}
