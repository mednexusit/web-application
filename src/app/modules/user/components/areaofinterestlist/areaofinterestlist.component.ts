import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SharedService } from '../../../../shared/shared.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-areaofinterestlist',
  templateUrl: './areaofinterestlist.component.html',
  styleUrl: './areaofinterestlist.component.scss'
})
export class AreaofinterestlistComponent implements OnInit{
  areaOfInterestData:any=[];
  userData:any;
  constructor(private userServ:UserService, private sharedServ:SharedService, private router:Router, private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.fetchAreaOfInterest(this.userData)
  }
  goToConference(data:any){
    this.sharedServ.sendSubjectData(data);
    this.router.navigate(['dashboard/home/conferences-list',0])

  }
  deleteAOI(data:any){
    let dataToPass={
      "user_id":this.userData.userid,
      "id":data.areaofintrest_id
    }
    this.userServ.deleteAreaOfInterest(dataToPass).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.toastr.success(data.responseContents,'',{timeOut:1000})
          this.fetchAreaOfInterest(this.userData);
        }
      },
      error:(err:any)=>{
        console.error(err)
        this.toastr.success('Failed to Delete','',{timeOut:1000})
      }
    })
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
