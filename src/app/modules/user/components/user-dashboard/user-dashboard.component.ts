import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SharedService } from './../../../../shared/shared.service';
import { ThememanageService } from '../../theme/thememanage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { AdminservService } from '../../../admin/services/adminserv.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  base2URL:any;
  notifications:any;
  isSidebarOpen = true; // Sidebar initially open
  sidenavMode: MatDrawerMode = 'side'; // Correctly typing the sidenavMode as MatDrawerMode
  selectedValueTab1: string = 'all';
  selectedValueTab2: string = 'aboutConference';


  private dialogRef: MatDialogRef<any> | null = null;

  onTabChange(event: any) {
    if (event.index === 0) {
      this.selectedValueTab1 = 'all'; // Reset Tab 1
    } else if (event.index === 1) {
      this.selectedValueTab2 = 'aboutConference'; // Reset Tab 2
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  isDarkTheme = false;
  logoSrc: string;
  userLogoSrc: string;
  toggleLogoSrc: string;
  isLoggedInUser: boolean = false;
  userData:any;
  constructor(
    private themeService: ThememanageService,
    private SharedService: SharedService,
    private authServ: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private userServ:UserService,
    private toastr:ToastrService
  ) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
  }
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.isLoggedInUser = sessionStorage.getItem('LoggedInUser') !== null;
    this.base2URL = environment.baseURL2;
    this.getBookingList();
  }
  logoutUser() {
    this.SharedService.sendHideHeaderFlag(true);
    this.authServ.logoutUser();
    this.router.navigate(['']);
    sessionStorage.clear();
    this.isLoggedInUser = sessionStorage.getItem('LoggedInUser') !== null;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme);
    this.SharedService.sendTheme(this.isDarkTheme);
    this.logoSrc = this.themeService.getLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
  }
  goToMyProfile(){
    this.router.navigate(['dashboard/myprofile']);
  }
  goToAddConference(){

    this.router.navigate(['vendor/signup'])
  }
  goToAbout(){
    this.router.navigate(['/aboutus'])
  }
  goToContact(){
    this.router.navigate(['/contactus'])
  }
  goToFollow(){
    this.router.navigate(['/followus'])
  }
  getBookingList(){
    let dataToPass={
      "user_id":this.userData.userid
    }
    this.userServ.fetchBookingConfirmation(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.notifications = data.responseContents.slice(0, 5);
        }
      },
      error:(err:any)=>{
        this.toastr.error('Failed to load','',{timeOut:1000});
      }
    })
  }
}
