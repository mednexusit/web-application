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



  hotJobs = [
    {
      type: 'Full Time',
      title: 'Project Manager',
      company: 'Dig File',
      location: 'San Francisco, CA, US',
      level: 'Mid Level',
      salary: '$5,000 - $6,000',
      logoUrl: 'https://www.bootdey.com/image/300x100/7B68EE/000000',
      postedTime: '23 hours'
    }

  ];

  recentjobs = [
    {
      type: 'Full Time',
      title: 'Project Manager',
      company: 'Dig File',
      location: 'San Francisco, CA, US',
      level: 'Mid Level',
      salary: '$5,000 - $6,000',
      logoUrl: 'https://www.bootdey.com/image/300x100/7B68EE/000000',
      postedTime: '23 hours'
    }

  ];

  popularjobs = [
    {
      type: 'Full Time',
      title: 'Project Manager',
      company: 'Dig File',
      location: 'San Francisco, CA, US',
      level: 'Mid Level',
      salary: '$5,000 - $6,000',
      logoUrl: 'https://www.bootdey.com/image/300x100/7B68EE/000000',
      postedTime: '23 hours'
    }

  ];


  openPersonalDetails() {
    if (this.dialogRef) {
      this.dialogRef.close(); // Close any previously opened modal
    }

    this.dialogRef = this.dialog.open(UserDashboardComponent, {
      width: '400px',
      height: '100%',
      position: { top: '0', right: '0' },
      panelClass: 'custom-modalbox',
      disableClose: false, // Allow outside click to close
      backdropClass: 'modal-backdrop',
    });

    document.body.style.overflow = 'hidden'; // Disable body scroll when modal is open

    this.dialogRef.afterClosed().subscribe(() => {
      document.body.style.overflow = ''; // Restore scroll after closing modal
      this.dialogRef = null; // Clear the reference when closed
    });
  }

  closeModal() {
    if (this.dialogRef) {
      this.dialogRef.close(); // Close the dialog when close button is clicked
    }
  }
  
  
  
  

  

  

}
