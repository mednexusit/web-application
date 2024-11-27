import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myprofilepage',
  templateUrl: './myprofilepage.component.html',
  styleUrl: './myprofilepage.component.scss',
})
export class MyprofilepageComponent implements OnInit {
  userDetailsData: any;
  userData: any;
  courses: any = [];
  specialities: any = [];
  isModalOpen: boolean = false;
  updateUserProfile: any = FormGroup;
  isOtherSelected: boolean = false;
  isShowYearOfStudying: boolean = false;
  isCompleted: boolean = false;
  subCoursesList: any = [];
  isShowSubCourseList: boolean = false;
  isAddMember:boolean=false;
  isOpenSubCourseModal: boolean = false;
  subCourseLabel: string = '';
  selectedSubCourseList: any;
  selectedSubCourse: any;
  addMemberForm:any=FormGroup;
  addEditLabel:string='Add';
  gender:any=[{label:'Male',value:1},{label:"Female",value:2}];
  constructor(private userServ: UserService, private fb: FormBuilder, private toastr:ToastrService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.getUserDetails(this.userData);
    this.fetchCourses();
    this.addMemberForm = this.fb.group({
      "user_uuid":[''],
      "name":['',Validators.required],
      "email":['',Validators.compose([Validators.required,Validators.email])],
      "mobile_number":['',Validators.required],
      "age":['',Validators.required],
      "gender":['',Validators.required],
      "mbbs":[''],
      "postgraduation":[''],
      "superspecialty":[''],
      "current_position":[''],
      "exporstudiing_year":[''],
      "current_working_or_studying":[''],
      "council_state":[''],
      "council_reg":[''],
      "yearofstudying":[''],
      "yearofpracticing":[''],
      "medRegisterNum":['']
    })
    this.updateUserProfile = this.fb.group({
      course: ['', Validators.required],
      sub_course: ['', Validators.required],
      sub_course_list: [''],
      yearofstudying: [''],
      studying: [''],
      practice: [''],
      user_id: ['', Validators.required],
    });
    this.updateUserProfile.get('user_id').setValue(this.userData.userid);

    ///////////Select Course////////////////
    this.updateUserProfile.get('course').valueChanges.subscribe((data: any) => {
      this.updateUserProfile.updateValueAndValidity();

      if (data?.id) {
        this.fetchSpeciality(data);
      }
      if (data.name === 'Others') {
        this.isOtherSelected = true;
        this.updateUserProfile.get('sub_course').setValue(4);
      } else {
        this.isOtherSelected = false;
      }
    });
    ///////////Select Course End////////////////

    this.updateUserProfile
      .get('sub_course')
      .valueChanges.subscribe((data: any) => {
        this.selectedSubCourse = data;

        if (data) {
          if (data.specialityname === 'Studying') {
            this.isShowYearOfStudying = true;
          } else {
            this.isShowYearOfStudying = false;
          }
          if (
            data.specialityname === 'Completed' ||
            data.specialityname == 'MD' ||
            data.specialityname == 'MS' ||
            data.specialityname == 'DNB' ||
            data.specialityname == 'DM' ||
            data.specialityname == 'MCH' ||
            data.specialityname == 'DRNB'
          ) {
            this.isCompleted = true;
          } else {
            this.isCompleted = false;
          }
          if (
            data.specialityname == 'MD' ||
            data.specialityname == 'MS' ||
            data.specialityname == 'DNB' ||
            data.specialityname == 'DM' ||
            data.specialityname == 'MCH' ||
            data.specialityname == 'DRNB'
          ) {
            this.fetchSubCoursesList(data);
            this.subCourseLabel = 'Select ' + data.specialityname;
          }
        }
      });
    ///////////////////Select Is Studying/Completed///////////////////////////////
    this.updateUserProfile
      .get('studying')
      .valueChanges.subscribe((data: any) => {
        this.updateUserProfile.updateValueAndValidity();
      });
  }

  getSelectedSubCourse(data: any) {
    this.updateUserProfile.get('sub_course_list')?.setValue(data.name);
    this.updateUserProfile.updateValueAndValidity();
    this.selectedSubCourseList = data;
  }
  openModal() {
    this.isModalOpen = true;
  }

  closeSubCourseModal() {
    this.isOpenSubCourseModal = false;
  }
  openSubCourseModal() {
    this.isOpenSubCourseModal = true;
  }

  fetchCourses() {
    this.userServ.getCourses().subscribe({
      next: (data: any) => {
        this.courses = data.responseContents;
      },
      error: (err: any) => {},
    });
  }
  fetchSpeciality(data: any) {
    let dataToPass = {
      courses_id: data?.id,
    };
    this.userServ.getSpeciality(dataToPass).subscribe({
      next: (data: any) => {
        this.specialities = data.responseContents;
      },
      error: (err: any) => {
        console.error(err)
      },
    });
  }
  getUserDetails(data: any) {
    if (data?.userid) {
      let dataToPass = {
        user_id: data.userid,
      };
      this.userServ.getUserDetails(dataToPass).subscribe({
        next: (data: any) => {
          this.userDetailsData = data.responseContents;
          this.userDetailsData = this.userDetailsData[0];
          if (this.userDetailsData[0]?.course) {
            // this.getUserSpecialities();
          }
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
  closeModal(){
    this.isModalOpen=false;
  }
  fetchSubCoursesList(data: any) {
    let dataToPass = {
      courses_id: data?.id,
    };
    this.userServ.getSubCourseList(dataToPass).subscribe({
      next: (data: any) => {
        //this.specialities = data.responseContents;
        this.subCoursesList = data.responseContents;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  goBack(){
    this.userServ.goBack();
  }
  updateUserPrefrences(data: any) {
    let dataToPass={
      "course":data.course?.id || 'NULL',
      "sub_course":data.sub_course?.id  || 'NULL',
      "sub_course_list":this.selectedSubCourseList?.id  || 'NULL',
      "yearofstudying":data?.yearofstudying  || 'NULL',
      "studying":parseInt(data?.studying)  || 'NULL',
      "practice":data?.practice  || 'NULL',
      "user_id":data?.user_id || 'NULL'
    }
    this.userServ.updateUserProfileData(dataToPass).subscribe({
      next:(data:any)=>{
          if(data.responseContents){
            this.toastr.success(data.responseContents,'',{timeOut:1500})
            this.isModalOpen=false;
            this.getUserDetails(this.userData);
            this.updateUserProfile.reset();
          }
      }
      ,
      error:(error)=>{
        console.error(error)
        this.toastr.error("Failed to update",'',{timeOut:1000})
      }
    })
  }
  myProfileToggle(){
    this.isAddMember = false;
  }
  confPartToggle(){
    this.isAddMember=true;
  }
  addParticipant(data:any){
    data.user_uuid = this.userData.userid;
    data.age= parseInt(data.age);
    data.gender= parseInt(data.gender);
    this.userServ.addParticipant(data).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.toastr.success('Added','',{timeOut:1000});
          this.addMemberForm.reset();
         // this.getParticipants();
          this.closeModals();

        }
      },
      error:(err:any)=>{
        this.toastr.error('Failed','',{timeOut:1000});
      }
    })
  }
  closeModals(){

  }
  // updateParticipant(data:any){
  //   data.id=parseInt(this.editData.id)
  //   data.user_uuid = this.userData.userid;
  //   data.age= parseInt(data.age);
  //   data.gender= parseInt(data.gender);
  //   this.userServ.editParticipant(data).subscribe({
  //     next:(data:any)=>{
  //       if(data.responseContents){
  //         this.toastr.success('Updated','',{timeOut:1000});
  //         this.addMemberForm.reset();
  //         this.getParticipants();
  //         this.closeModals();

  //       }
  //     },
  //     error:(err:any)=>{
  //       this.toastr.error('Failed','',{timeOut:1000});
  //     }
  //   })
  // }
}
