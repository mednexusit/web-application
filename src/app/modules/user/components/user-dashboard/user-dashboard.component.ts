import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SharedService } from './../../../../shared/shared.service';
import { ThememanageService } from '../../theme/thememanage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  isSidebarOpen = true; // Sidebar initially open
  sidenavMode: MatDrawerMode = 'side'; // Correctly typing the sidenavMode as MatDrawerMode
  selectedValueTab1: string = 'all' ;
  selectedValueTab2: string = 'aboutConference'; 


  private dialogRef: MatDialogRef<any> | null = null;


  onTabChange(event: any) {
    if (event.index === 0) {
      this.selectedValueTab1 = 'all';  // Reset Tab 1
    } else if (event.index === 1) {
      this.selectedValueTab2 = 'aboutConference';  // Reset Tab 2
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }



  isDarkTheme = false;
  logoSrc: string;
  userLogoSrc:string;
  toggleLogoSrc:string;
  isLoggedInUser:boolean=false;


  constructor(private themeService: ThememanageService, private SharedService:SharedService, private authServ:AuthService, private router:Router, public dialog: MatDialog) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc=this.themeService.getUserLogo();
    this.toggleLogoSrc=this.themeService.getToggleLogo();
  }
  ngOnInit(): void {
   this.isLoggedInUser =  localStorage.getItem('LoggedInUser') !== null;
  }
  logoutUser(){
    this.authServ.logoutUser();
    this.router.navigate(['']);
    this.isLoggedInUser =  localStorage.getItem('LoggedInUser') !== null;

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
