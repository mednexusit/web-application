import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { ThememanageService } from '../../theme/thememanage.service';
import { SharedService } from '../../../../shared/shared.service';
import { UserService } from '../../services/user.service';
import { ConferencedetailsComponent } from '../conferencedetails/conferencedetails.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  isSidebarOpen = true; // Sidebar initially open
  sidenavMode: MatDrawerMode = 'side'; // Correctly typing the sidenavMode as MatDrawerMode
  selectedValueTab1: string = 'all';
  selectedValueTab2: string = 'aboutConference';
  userData: any;
  remaindersData: any = [];
  userDetailsData: any = [];
  userAvailableSpecialities: any[] = [];
  private dialogRef: MatDialogRef<any> | null = null;
  displayedItems: number = 5;
  carnivalData: any = [];
  step = signal(0);

  setStep(index: number) {
    this.step.set(index);
  }

  nextStep() {
    this.step.update((i) => i + 1);
  }

  prevStep() {
    this.step.update((i) => i - 1);
  }

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

  areaOfInterestData: any = [];
  conferenceData: any;
  constructor(
    private themeService: ThememanageService,
    private SharedService: SharedService,
    private authServ: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private userServ: UserService,
    private cdr:ChangeDetectorRef
  ) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc = this.themeService.getUserLogo();
    this.toggleLogoSrc = this.themeService.getToggleLogo();
  }
  ngOnInit(): void {
    this.isLoggedInUser = sessionStorage.getItem('LoggedInUser') !== null;
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.getUserDetailsData(this.userData);
    this.fetchAreaOfInterest(this.userData);
    this.fetchAllRemainders(this.userData);
    this.fetchConferences();
  }

  logoutUser() {
    this.authServ.logoutUser();
    this.router.navigate(['']);
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
      // width: '400px',
      // height: '100%',
      // position: { top: '0', right: '0' },
      height: 'calc(100%)',
      width: 'calc(100%)',
      maxWidth: '100%',
      maxHeight: '100%',
      // panelClass: 'custom-modalbox',
      disableClose: false, // Allow outside click to close
      // backdropClass: 'modal-backdrop',
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

  getUserDetailsData(data: any) {
    if (data?.userid) {
      let dataToPass = {
        user_id: data.userid,
      };
      this.userServ.getUserDetails(dataToPass).subscribe({
        next:  (data: any) => {
          this.userDetailsData =  [...data.responseContents];
          if (
            this.userDetailsData &&
            this.userDetailsData.length > 0 &&
            this.userDetailsData[0]?.course
          ) {
            this.getUserSpecialities(this.userDetailsData[0]);
            // this.getUserDataAndSpecialities();
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
  getUserSpecialities(data: any) {
    let dataToPass = {
      course_id: data?.course,
      sub_courses_sub_list: this.userDetailsData[0]?.sub_course_list,
    };
    this.userServ.getSpecialitiesAvailable(dataToPass).subscribe({
      next: (data: any) => {
        this.userAvailableSpecialities = [...data.responseContents];
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  goToConferences(data: any) {
    this.SharedService.sendSubjectData(data);
    this.router.navigate(['dashboard/home/conferences-list', 0]);
  }

  openModal(data: any) {
    this.dialog.open(ConferencedetailsComponent, {
      data: data,
      // height:'500px'
      height: 'calc(100%)',
      width: 'calc(100%)',
      maxWidth: '100%',
      maxHeight: '100%',
    });
  }
  goToConference(data: any) {
    this.router.navigate([
      'dashboard/home/conferences-list',
      data.subject_uuid,
    ]);
  }

  goToAreaOfInterest() {
    this.router.navigate(['dashboard/areaofinterest']);
  }


  fetchConferences() {
    this.userServ.getAllSearchConferences().subscribe({
      next: (data: any) => {
        if (data) {
          this.carnivalData = [...data.responseContents];
          this.carnivalData = this.carnivalData.slice(-5)
          this.carnivalData.forEach((item: any) => {
            item.price = item.price === 'null' ? 0 : item.price;
          });
        } else {
          console.warn('No conference data found.');
        }
      },
      error: (err: any) => console.error(err),
    });
  }
  get limitedAreaOfInterestData() {
    return this.areaOfInterestData.slice(0, this.displayedItems);
  }
  fetchAreaOfInterest(data: any) {
    if (data?.userid) {
      let dataToPass = {
        user_id: data.userid,
      };
      this.userServ.getAreaOfInterest(dataToPass).subscribe({
        next: (data: any) => {
          this.areaOfInterestData = data.responseContents;
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
  viewAllAreaOfInterest() {
    this.router.navigate(['dashboard/home/viewareaofinterest']);
  }

  getDateStatus(date: string): string {
    const proposalDate = new Date(date);
    const today = new Date();

    // Convert both dates to UTC midnight to remove timezone discrepancies
    const utcProposalDate = Date.UTC(
      proposalDate.getUTCFullYear(),
      proposalDate.getUTCMonth(),
      proposalDate.getUTCDate()
    );
    const utcToday = Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );

    const diffInMs = utcProposalDate - utcToday;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays <= 0) {
      return 'Date has passed';
    } else if (diffInDays === 1) {
      return 'Conference will be tomorrow';
    } else {
      return `${diffInDays} days to go`;
    }
  }

  fetchAllRemainders(data: any) {
    let dataToPass = {
      user_id: data.userid,
    };
    this.userServ.getAllRemainders(dataToPass).subscribe({
      next: (data: any) => {
        this.remaindersData = [...data.responseContents];
        this.remaindersData.forEach((item: any) => {
          if (item.price == 'null') {
            item.price = 0;
          }
        });
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
}
