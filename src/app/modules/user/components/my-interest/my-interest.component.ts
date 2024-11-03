import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatDrawerMode } from '@angular/material/sidenav';
import { SharedService } from '../../../../shared/shared.service';
import { UserService } from '../../services/user.service';
import { ConferencedetailsComponent } from '../conferencedetails/conferencedetails.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
  participantsData:any=[];

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
  userData:any;
  bookingConfirmationList:any=[];
  myInterest:any=[];

  constructor(   public dialog: MatDialog, private userServ:UserService, private toastr:ToastrService) {}
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
   this.isLoggedInUser =  sessionStorage.getItem('LoggedInUser') !== null;
    this.selectedTab="enrollment";
    this.fetchMyInterest();
    this.fetchBookingConfirmationList();

  }

  getSelectedTab(event:any){
    this.selectedTab= event.tab.textLabel;
    if(this.selectedTab==='enrollment'){
      this.fetchBookingConfirmationList();
    }
    if(this.selectedTab==="bookmarks"){
      this.fetchMyInterest();
    }
  }

  fetchBookingConfirmationList(){
    let dataToPass={
      user_id:this.userData.userid
    }
    this.userServ.fetchBookingConfirmation(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.bookingConfirmationList = data.responseContents;
        }
      }
      ,error:(err:any)=>{
        console.error(err)
      }
    })
  }

  fetchMyInterest(){
    let dataToPass={
      user_id:this.userData.userid
    }
    this.userServ.fetchBookMarkList(dataToPass).subscribe({
      next:(data:any)=>{
        this.myInterest = data.responseContents;
      }
      ,error:(err:any)=>{
        console.error(err)
      }
    })
  }

  deleteBookMark(data:any){
    let dataToPass={
      user_id:this.userData.userid,
      "conference_id":data.conference_id
    }
    this.userServ.deleteBookMark(dataToPass).subscribe({
      next:(data:any)=>{
        this.toastr.success('Deleted Bookmark','',{timeOut:1000});
        this.fetchMyInterest();
      }
      ,error:(err:any)=>{
        console.error(err)
        this.toastr.error('Failed to delete','',{timeOut:1000})
      }
    })
  }



  openModal(data:any, event:any){
    event.stopPropagation();
    if((event.target as HTMLElement).classList.contains('fa-trash')){
      this.deleteBookMark(data)
    }
    else{
      this.dialog.open(ConferencedetailsComponent,{
        data:data,
        height:'500px'
      })
    }

  }



}
