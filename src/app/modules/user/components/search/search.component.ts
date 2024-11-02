import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ConferencedetailsComponent } from '../conferencedetails/conferencedetails.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent  implements OnInit{
  searchText:string='';
  conferenceListData:any=[];
  userData:any;
  constructor(private userServ:UserService,public dialog: MatDialog){

  }
  ngOnInit(): void {

    this.fetchConferences();
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
  }
  bookmarkConference(data:any,event:any){
    event.stopPropagation();
    let dataToPass={
      "user_id":this.userData.userid,
      "conference_id":data.id
    }
    this.userServ.bookMarkSave(dataToPass).subscribe({
      next: (data: any) => {
        if(data.responseContents){
          this.fetchConferences();
        }
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  openModal(data:any, event:any){
    event.stopPropagation();
    // if((event.target as HTMLElement).classList.contains('fa-trash')){
    //   this.deleteBookMark(data)
    // }

      this.dialog.open(ConferencedetailsComponent,{
        data:data,
        height:'500px'
      })


  }
  fetchConferences(){
    this.userServ.getAllSearchConferences().subscribe({
      next:(data:any)=>{
        if(data){
          this.conferenceListData = data.responseContents;
          console.log(this.conferenceListData)
        }
      },
      error:(err:any)=>{
        console.error(err);
      }
    })
  }
}
