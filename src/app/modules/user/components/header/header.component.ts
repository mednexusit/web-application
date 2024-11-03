import { SharedService } from './../../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { ThememanageService } from '../../theme/thememanage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;
  logoSrc: string;
  userLogoSrc: string;
  toggleLogoSrc: string;
  isHideHeader: boolean = true;
  isLoggedInUser: boolean = false;
  showDropdown = false; // controls dropdown visibility
  constructor(
    private rt: ActivatedRoute,
    private themeService: ThememanageService,
    private SharedService: SharedService,
    private authServ: AuthService,
    private router: Router
  ) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
  }
  ngOnInit(): void {
    this.isLoggedInUser = sessionStorage.getItem('LoggedInUser') !== null;
    if (this.router.url.includes('dashboard')) {
      this.isHideHeader = false;
    } else {
      this.isHideHeader = true;
    }
    this.SharedService.getHideHeaderFlag().subscribe((data: any) => {
      if (data) {
        this.isLoggedInUser = false;
      }
      this.isHideHeader = data;
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logoutUser() {
    this.authServ.logoutUser();
    this.router.navigate(['']);
    this.isLoggedInUser = false;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme);
    this.SharedService.sendTheme(this.isDarkTheme);
    this.logoSrc = this.themeService.getLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
  }
}
