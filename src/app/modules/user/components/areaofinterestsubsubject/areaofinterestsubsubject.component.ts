import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-areaofinterestsubsubject',
  templateUrl: './areaofinterestsubsubject.component.html',
  styleUrl: './areaofinterestsubsubject.component.scss'
})
export class AreaofinterestsubsubjectComponent implements OnInit{
  subjectID:any;
  subSubjectListData:any=[];
  selectedIds: number[] = [];
  userData:any;
  constructor(private route:ActivatedRoute, private userServ:UserService, private toastr:ToastrService, private router:Router){

  }
  ngOnInit(): void {
    this.subjectID = this.route.snapshot.params['id'];
    this.userData = sessionStorage.getItem("userData");
    this.userData = JSON.parse(this.userData);
    this.fetchSubSubjects();
  }
  onCheckboxChange(event: Event, id: number): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(selectedId => selectedId !== id);
    }
  }
  fetchSubSubjects(){
    let dataToPass={
      subject_id:this.subjectID
    }
    this.userServ.getAreaOfInterestSubSubjects(dataToPass).subscribe({
      next:(data:any)=>{
        this.subSubjectListData = data.responseContents;
      },
      error:(err)=>{
        console.error("Error is",err)
      }
    })
  }
  createAreaOfInterest(){
    let dataToPass={
      "subject_id":this.subjectID,
      "sub_subject_ids":this.selectedIds.join(","),
      "user_id":this.userData.userid
    }
    this.userServ.createAreaOfInterest(dataToPass).subscribe({
      next:(data:any)=>{
      if(data.responseContents){
        this.toastr.success(data.responseContents,'',{timeOut:1000})
        this.router.navigate(['dashboard'])
      }
      },
      error:(err)=>{
        console.error("Error is",err)
        this.toastr.error('Failed to save','',{timeOut:1000})
      }
    })
  }
}
