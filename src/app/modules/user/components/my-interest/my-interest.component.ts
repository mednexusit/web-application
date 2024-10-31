import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-my-interest',
  templateUrl: './my-interest.component.html',
  styleUrl: './my-interest.component.scss'
})
export class MyInterestComponent implements OnInit {


  isSidebarOpen = true; // Sidebar initially open
  sidenavMode: MatDrawerMode = 'side'; // Correctly typing the sidenavMode as MatDrawerMode
  selectedValueTab1: string = 'all' ;
  selectedValueTab2: string = 'aboutConference';
  selectedTab:any;


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
   this.isLoggedInUser =  sessionStorage.getItem('LoggedInUser') !== null;
    this.selectedTab="enrollment"
  }

  getSelectedTab(event:any){
    this.selectedTab= event.tab.textLabel;
  }







}
