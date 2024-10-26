import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../../../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areaofinterestlist',
  templateUrl: './areaofinterestlist.component.html',
  styleUrl: './areaofinterestlist.component.scss'
})
export class AreaofinterestlistComponent implements OnInit{
  areaOfInterestData:any=[];
  userData:any;
  constructor(private userServ:UserService, private sharedServ:SharedService, private router:Router){

  }
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.fetchAreaOfInterest(this.userData)
  }
  goToConference(data:any){
    console.log(data)
    this.sharedServ.sendSubjectData(data);
    this.router.navigate(['dashboard/conferences-list',0])

  }
  fetchAreaOfInterest(data:any){
    if (data?.userid) {
      let dataToPass={
        user_id:data.userid
      }
      this.userServ.getAreaOfInterest(dataToPass).subscribe({
        next:(data:any)=>{
          this.areaOfInterestData= data.responseContents;
        },
        error:(err:any)=>{
          console.error(err)
        }
      })
    }
  }
}
