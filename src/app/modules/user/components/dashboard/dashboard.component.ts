import { Component } from '@angular/core';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { ThememanageService } from '../../theme/thememanage.service';
import { SharedService } from '../../../../shared/shared.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  isSidebarOpen = true; // Sidebar initially open
  sidenavMode: MatDrawerMode = 'side'; // Correctly typing the sidenavMode as MatDrawerMode
  selectedValueTab1: string = 'all';
  selectedValueTab2: string = 'aboutConference';
  userData: any;
  userDetailsData:any=[];
  userAvailableSpecialities:any=[];
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

  constructor(
    private themeService: ThememanageService,
    private SharedService: SharedService,
    private authServ: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private userServ:UserService
  ) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
  }
  ngOnInit(): void {
    this.isLoggedInUser = localStorage.getItem('LoggedInUser') !== null;
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    console.log('sss', this.userData);
    this.getUserDetails(this.userData);
  }
  logoutUser() {
    this.authServ.logoutUser();
    this.router.navigate(['']);
    this.isLoggedInUser = localStorage.getItem('LoggedInUser') !== null;
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme);
    this.SharedService.sendTheme(this.isDarkTheme);
    this.logoSrc = this.themeService.getLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
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
      postedTime: '23 hours',
    },
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
      postedTime: '23 hours',
    },
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
      postedTime: '23 hours',
    },
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

  getUserDetails(data: any) {
    if (data?.userid) {
      let dataToPass={
        user_id:data.userid
      }
      this.userServ.getUserDetails(dataToPass).subscribe({
        next:(data:any)=>{
          this.userDetailsData= data.responseContents;
          console.log(this.userDetailsData)
          if(this.userDetailsData){
            this.getUserSpecialities();
          }
        },
        error:(err:any)=>{
          console.error(err)
        }
      })
    }
  }
  getUserSpecialities(){
    let dataToPass={
    "course_id":this.userDetailsData[0].course,
    "sub_courses_sub_list":this.userDetailsData[0].sub_course_list
    }
    this.userServ.getSpecialitiesAvailable(dataToPass).subscribe(
      {
        next:(data:any)=>{
          this.userAvailableSpecialities= data.responseContents;
          console.log(this.userAvailableSpecialities)
        },
        error:(err:any)=>{
          console.error(err)
        }
      }
    )
  }
}
