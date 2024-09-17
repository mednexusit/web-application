import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-my-interest',
  templateUrl: './my-interest.component.html',
  styleUrl: './my-interest.component.scss'
})
export class MyInterestComponent {


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


  constructor(   public dialog: MatDialog) {}
  ngOnInit(): void {
   this.isLoggedInUser =  localStorage.getItem('LoggedInUser') !== null;
  }



  openPersonalDetails() {
    if (this.dialogRef) {
      this.dialogRef.close(); // Close any previously opened modal
    }

    this.dialogRef = this.dialog.open(MyInterestComponent, {
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
