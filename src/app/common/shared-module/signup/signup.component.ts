import { filter } from 'rxjs';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
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
  collegeSearchText: any = '';
  isShowStates: boolean = false;
  isShowCollege: boolean = false;
  tempCollegeData: any = [];
  signupForm: any = FormGroup;
  isCompletedFlag: any = '';
  selectedStateData: any;
  selectedCollegeData: any;
  isStateSelected: boolean = false;
  msListData: any = [];
  isMbbsSelected: boolean = false;
  isPGDNBSelected: boolean = false;
  isSSDNBSelected: boolean = false;
  isPractisingSelected: boolean = false;
  isShowMD: boolean = false;
  isShowMS: boolean = false;
  msSearchText: any = '';
  mdSearchText: any = '';
  isShowOtherOption:any='';
  mdOrMS: any = '';
  dmORMCH: any;
  dmSearchText: any;
  isShowDM: boolean = false;
  isShowMCH: boolean = false;
  mchSearchText: any;
  showOtherInput:boolean=false;
  mdListData: any;
  mchListData: any;
  constructor(
    private resServ: ResourceService,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.getStatesList();
   // this.getMsListData();
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      ],
      age: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]),
      ],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      college: [{ value: '', disabled: true }, Validators.required],
      city: ['', Validators.required],
      mrn: ['', Validators.required],
      course: ['mbbs', Validators.required],
      isCompleted: [''],
      isMdOrMS: [''],
      md: [''],
      ms: [''],
      isDmOrMCH: [''],
      dm: [''],
      mch: [''],
      practising: [''],
      experience: [''],
      others: [''],
      otherCollege:['']
    });
    this.isMbbsSelected = true;
    this.signupForm.get('isDmOrMCH').valueChanges.subscribe((data:any)=>{
      if(data==='mch'){
        this.getMCHListData();
      }
      if(data==="dm"){
        this.getMdListData();
      }
    })
    this.signupForm.get('isMdOrMS').valueChanges.subscribe((data:any)=>{
      if(data==='md'){
        this.getMdListData();
      }
      if(data==="ms"){
        this.getMsListData();
      }
    })
    this.signupForm.get('course').valueChanges.subscribe((data: any) => {
      if (data === 'mbbs') {
        this.isMbbsSelected = true;
        this.isPGDNBSelected = false;
        this.isSSDNBSelected = false;
        this.isPractisingSelected = false;
      }
      if (data === 'pg/dnb') {
        this.isMbbsSelected = false;
        this.isPGDNBSelected = true;
        this.isSSDNBSelected = false;
        this.isPractisingSelected = false;
      }
      if (data === 'ss/dnb') {
        this.isMbbsSelected = false;
        this.isPGDNBSelected = false;
        this.isSSDNBSelected = true;
        this.isPractisingSelected = false;
      }
      if (data === 'practising') {
        this.isMbbsSelected = false;
        this.isPGDNBSelected = false;
        this.isSSDNBSelected = false;
        this.isPractisingSelected = true;
      }
    });
  }
  getStateText(data: any) {
    this.stateSearchText = data.target.value;
    if (this.stateSearchText.length <= 0) {
      this.tempCollegeData = [];
      this.signupForm.get('college').disable();
    }
    if (this.stateSearchText.length > 1) {
      this.tempStatesData = this.tempStatesData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.stateSearchText.toLowerCase());
      });
    } else {
      this.getStatesList();
      this.tempCollegeData = [];
    }
  }
  getMsListData() {
    this.resServ.getMSList().subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.msListData = data.responseContents;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getMdListData() {
    this.resServ.getMDList().subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.mdListData = data.responseContents;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getMCHListData() {
    this.resServ.getMCHList().subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.mchListData = data.responseContents;
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getSelectedState(data: any) {
    this.selectedStateData = data;
    this.signupForm.get('state').setValue(data.name);
    this.isShowStates = false;
    this.isStateSelected = true;
    this.signupForm.get('college').enable();
    this.signupForm.get('college').setValue('');
    this.getCollegeList();
  }

  getCollegeList() {
    let dataToPass = {
      state_id: this.selectedStateData.id,
    };
    this.resServ.getColleges(dataToPass).subscribe({
      next: (data: any) => {
        this.tempCollegeData = data.responseContents;
      },
    });
  }

  getSelectedCollege(data: any) {
    this.selectedCollegeData = data;
    this.signupForm.get('college').setValue(data.name);
    this.isShowCollege = false;
  }
  getCollegeText(data: any) {
    this.collegeSearchText = data.target.value;
    if (this.collegeSearchText.length > 1) {
      this.tempCollegeData = this.tempCollegeData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.collegeSearchText.toLowerCase());
      });
      console.log("TEMPCOLLEGEDATA",this.tempCollegeData)
      if(this.tempCollegeData.length <=0){
        this.isShowOtherOption=true;
      }
      else{
        this.isShowOtherOption=false;
      }
    } else {
      this.getCollegeList();
    }
  }
  onCollegeFocus() {
    this.isShowCollege = true;
    this.isShowStates = false;
  }
  onCollegeBlur() {
    this.isShowCollege = false;
  }

  onStateFocus() {
    this.isShowStates = true;
    this.isShowCollege = false;
  }
  onStateBlur() {
    this.isShowStates = false;
  }
  onSelect(data: any) {
    console.log('Data selected is', data);
  }
  getStatesList() {
    this.resServ.getStates().subscribe({
      next: (data: any) => {
        this.tempStatesData = data;
      },
    });
  }

  getIsCompletedData(data: any) {
    this.isCompletedFlag = data;
    this.signupForm.get('isCompleted').setValue(data);
  }
  getMDORMS(data: any) {
    this.mdOrMS = data;
    this.isShowMD = false;
    this.isShowMS = false;
  }

  getMSText(data: any) {
    this.msSearchText = data.target.value;
    if (this.msSearchText.length === 0) {
      this.msListData = [];
    }
    if (this.msSearchText.length > 1) {
      this.msListData = this.msListData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.msSearchText.toLowerCase());
      });
    } else {
      this.getMsListData();
    }
  }
  onMDFocus() {
    this.isShowMD = true;
    this.isShowMS = false;
  }
  onMSFocus() {
    this.isShowMS = true;
    this.isShowMD = false;
  }
  getMDText(data: any) {
    this.mdSearchText = data.target.value;
    if (this.mdSearchText.length === 0) {
      this.msListData = [];
    }
    if (this.mdSearchText.length > 1) {
      this.msListData = this.msListData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.mdSearchText.toLowerCase());
      });
    } else {
      this.getMsListData();
    }
  }
  getSelectedMD(data: any) {
    this.signupForm.get('md').setValue(data.name);
    this.isShowMD = false;
  }
  getSelectedMS(data: any) {
    this.signupForm.get('ms').setValue(data.name);
    this.isShowMS = false;
  }
  getDMORMCH(data: any) {
    this.dmORMCH = data;
    this.isShowMCH = false;
    this.isShowDM = false;
  }

  getDMText(data: any) {
    this.dmSearchText = data.target.value;
    if (this.dmSearchText.length === 0) {
      this.msListData = [];
    }
    if (this.dmSearchText.length > 1) {
      this.msListData = this.msListData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.dmSearchText.toLowerCase());
      });
    } else {
      this.getMsListData();
    }
  }
  onDMFocus() {
    this.isShowDM = true;
    this.isShowMCH = false;
  }
  onMCHFocus() {
    this.isShowMCH = true;
    this.isShowDM = false;
  }
  getMCHText(data: any) {
    this.mchSearchText = data.target.value;
    if (this.mchSearchText.length === 0) {
      this.msListData = [];
    }
    if (this.mchSearchText.length > 1) {
      this.msListData = this.msListData.filter((item: any) => {
        return item.name
          .toLowerCase()
          .includes(this.mchSearchText.toLowerCase());
      });
    } else {
      this.getMsListData();
    }
  }
  getSelectedMCH(data: any) {
    this.signupForm.get('mch').setValue(data.name);
    this.isShowMCH = false;
  }
  getSelectedDM(data: any) {
    this.signupForm.get('dm').setValue(data.name);
    this.isShowDM = false;
  }
  selectOtherOption(){
    this.showOtherInput=true;
    this.isShowOtherOption=false;
    this.isShowCollege=false;
  }
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.tempCollegeData = [];
      this.tempStatesData = [];
    }
  }
}
