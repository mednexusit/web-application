import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent  implements OnInit{
  searchText:string='';
  conferenceListData:any=[];
  constructor(private userServ:UserService){

  }
  ngOnInit(): void {
    this.fetchConferences();
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
