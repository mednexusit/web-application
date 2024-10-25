import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areaofinterest',
  templateUrl: './areaofinterest.component.html',
  styleUrl: './areaofinterest.component.scss'
})
export class AreaofinterestComponent implements OnInit {
  subjectsListData:any=[];
  constructor(private userServ:UserService,private router:Router){

  }
  ngOnInit(): void {
    this.fetchSubjectsAvailable();
  }
  fetchSubjectsAvailable(){
    this.userServ.getAreaOfInterestSubjects().subscribe({
      next:(data:any)=>{
        this.subjectsListData = data.responseContents;
        console.log(this.subjectsListData)
      },
      error:(err)=>{
        console.error("Error is",err)
      }
    })
  }
  goToSubSubject(data:any){
    this.router.navigate(['dashboard/aoisubjects', data.id])
  }
}
