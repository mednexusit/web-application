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
  isCompletedFlag:any='';
  selectedStateData:any;
  selectedCollegeData:any;
  isStateSelected:boolean=false;
  msListData:any=[];
  isMbbsSelected:boolean=false;
  isPGDNBSelected:boolean=false;
  isSSDNBSelected:boolean=false;
  isPractisingSelected:boolean=false;
  constructor(private resServ: ResourceService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.getStatesList();
    this.getMsListData();
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])],
      age:['',Validators.compose([Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      gender:['',Validators.required],
      state:['',Validators.required],
      college: [{ value: '', disabled: true }, Validators.required],
      city:['',Validators.required],
      mrn:['',Validators.required],
      course:['mbbs',Validators.required],
      isCompleted:['']
    })
    this.isMbbsSelected=true;

    this.signupForm.get('course').valueChanges.subscribe((data:any)=>{
      console.log("Radio Data",data);
      if(data==='mbbs'){
        this.isMbbsSelected=true;
        this.isPGDNBSelected=false;
        this.isSSDNBSelected=false;
        this.isPractisingSelected=false;
      }
      if(data==='pg/dnb'){
        this.isMbbsSelected=false;
        this.isPGDNBSelected=true;
        this.isSSDNBSelected=false;
        this.isPractisingSelected=false;
      }
      if(data==='ss/dnb'){
        this.isMbbsSelected=false;
        this.isPGDNBSelected=false;
        this.isSSDNBSelected=true;
        this.isPractisingSelected=false;
      }
      if(data==='practising'){
        this.isMbbsSelected=false;
        this.isPGDNBSelected=false;
        this.isSSDNBSelected=false;
        this.isPractisingSelected=true;
      }
    })
  }
  getStateText(data: any) {
    this.stateSearchText = data.target.value;
    if(this.stateSearchText.length===0){
      this.tempCollegeData=[];
    }
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
  getMsListData(){
    this.resServ.getMSList().subscribe({
      next:(data:any)=>{
        console.log("data is",data);
        if(data.responseContents){
          this.msListData = data.responseContents;

        }
      }
      ,error:(err:any)=>{
        console.log(err)
      }
    })
  }
  getSelectedState(data: any) {
    this.selectedStateData = data;
    this.signupForm.get('state').setValue(data.name);
    this.isShowStates=false;
    this.isStateSelected=true;
    this.signupForm.get('college').enable();
    this.signupForm.get('college').setValue('')
    this.getCollegeList();
  }

  getCollegeList(){
    let dataToPass={
      state_id:this.selectedStateData.id
    }
    this.resServ.getColleges(dataToPass).subscribe({
      next:(data:any)=>{
        this.tempCollegeData=data.responseContents;
        console.log(this.tempCollegeData)
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
    this.isShowStates=false;
  }
  onCollegeBlur(){
    this.isShowCollege=false;
  }

  onStateFocus(){
      this.isShowStates=true;
      this.isShowCollege=false;
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

  getIsCompletedData(data:any){
    this.isCompletedFlag=data;
    this.signupForm.get('isCompleted').setValue(data);
    console.log(this.signupForm.get('isCompleted').value)
  }
}
