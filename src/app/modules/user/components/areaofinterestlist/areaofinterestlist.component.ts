import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-areaofinterestlist',
  templateUrl: './areaofinterestlist.component.html',
  styleUrl: './areaofinterestlist.component.scss'
})
export class AreaofinterestlistComponent implements OnInit{
  areaOfInterestData:any=[];
  userData:any;
  constructor(private userServ:UserService){

  }
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.fetchAreaOfInterest(this.userData)
  }
  fetchAreaOfInterest(data:any){
    if (data?.userid) {
      let dataToPass={
        user_id:data.userid
      }
      this.userServ.getAreaOfInterest(dataToPass).subscribe({
        next:(data:any)=>{
          this.areaOfInterestData= data.responseContents;
          console.log("AreaOFI",this.areaOfInterestData)
        },
        error:(err:any)=>{
          console.error(err)
        }
      })
    }
  }
}
