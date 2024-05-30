import { filter } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../shared/resource.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  tempStatesData: any = [];
  stateSearchText: any = '';
  collegeSearchText:any='';
  isShowStates: boolean = false;
  isShowCollege:boolean=false;
  tempCollegeData:any=[];
  signupForm:any=FormGroup;
  selectedStateData:any;
  selectedCollegeData:any;
  constructor(private resServ: ResourceService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.getStatesList();
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      age:['',Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      gender:['',Validators.required],
      state:['',Validators.required],
      college:['',Validators.required],
      city:['',Validators.required],
      mrn:['',Validators.required],
      course:['',Validators.required],
      isCompleted:['',Validators.required]
    })
  }
  getStateText(data: any) {
    this.stateSearchText = data.target.value;
    if (this.stateSearchText.length > 1) {
      this.tempStatesData = this.tempStatesData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.stateSearchText.toLowerCase());
      });
    } else {
      this.getStatesList();

    }
  }
  getSelectedState(data: any) {
    this.selectedStateData = data;
    this.signupForm.get('state').setValue(data.name);
    this.isShowStates=false;
    this.getCollegeList()

  }

  getCollegeList(){
    let dataToPass={
      state_id:this.selectedStateData.id
    }
    this.resServ.getColleges(dataToPass).subscribe({
      next:(data:any)=>{
        this.tempCollegeData=data.responseContents;
      }
    })
  }

  getSelectedCollege(data:any){
    this.selectedCollegeData=data;
    this.signupForm.get('college').setValue(data.name)
    this.isShowCollege=false;
  }
  getCollegeText(data:any){
    this.collegeSearchText = data.target.value;
    if (this.collegeSearchText.length > 1) {
      this.tempCollegeData = this.tempCollegeData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.collegeSearchText.toLowerCase());
      });
    } else {
      this.getCollegeList();
    }
  }
  onCollegeFocus(){
    this.isShowCollege=true;
  }
  onCollegeBlur(){
    this.isShowCollege=false;
  }

  onStateFocus(){
      this.isShowStates=true;
  }
  onStateBlur(){
    this.isShowStates=false;
  }

  getStatesList() {
    this.resServ.getStates().subscribe({
      next: (data: any) => {
        this.tempStatesData = data.responseContents;
      },
    });
  }
}
