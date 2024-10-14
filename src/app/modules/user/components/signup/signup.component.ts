import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, AfterViewInit {
  signupForm: FormGroup;
  selectedCourse: any;
  selectedSpecitality: any;
  subCourseLabel: string = '';
  isStudying: boolean = false;
  isCompletedSelected: boolean = false;
  isPracticeSelected: boolean = false;
  specialities: any = [];
  stateList: any = [];
  collegeList: any = [];
  subCoursesList: any = [];
  isOtherSelected: boolean = false;
  selectedState: any;
  selectedSubCourseList: any;
  selectedCollege: any;
  courses: any = [];
  collegePlaceHolder: any = 'Select College';
  isOpenStateModal: boolean = false;
  isOpenSubCourseModal: boolean = false;
  isOpenCollegeModal: boolean = false;
  mbbsSpecialities: any = [
    { id: 1, name: 'Studying' },
    { id: 2, name: 'Completed' },
  ];
  pgdnbSpecialities: any = [];
  @ViewChild('dateInput') dateInput: any;

  constructor(
    private fb: FormBuilder,
    private userServ: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      user_uuid: ['', Validators.required],
      fullname: ['', Validators.required],
      alternativemobilenumber: [
        '',
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      gender: ['', Validators.required],
      doornumber: [''],
      area: [''],
      pincode: [''],
      img: [''],
      course: ['', Validators.required],
      sub_course: ['', Validators.required],
      sub_course_list: ['', Validators.required],
      yearofstudying: [''],
      isStudying: [''],
      studying: ['', Validators.required],
      practice: [''],
      state: ['', Validators.required],
      college_id: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('userData') as string);
    if (userData.userid) {
      this.signupForm.get('user_uuid')?.setValue(userData.userid);
      this.checkLogin();
    }
    this.fetchCourses();
    this.fetchStateList();
    this.signupForm.get('course')?.valueChanges.subscribe((data: any) => {
      this.subCoursesList = [];
      this.subCourseLabel = '';
      this.selectedCourse = data;
      this.signupForm.get('studying')?.reset();
      this.signupForm.get('sub_course_list')?.reset();
      this.isCompletedSelected = false;
      if (this.selectedCourse.name.toLowerCase() === 'others') {
        this.isOtherSelected = true;
      } else {
        this.isOtherSelected = false;
      }
      if (this.selectedCourse && this.selectedCourse.id) {
        this.fetchSpeciality(this.selectedCourse);
      } else {
        this.specialities = [];
      }
    });

    this.signupForm.get('sub_course')?.valueChanges.subscribe((data: any) => {
      if (data) {
        this.subCourseLabel = '';
        if (
          data.specialityname != 'Studying' &&
          data.specialityname != 'Completed'
        ) {
          this.subCourseLabel = 'Select ' + data.specialityname;
          this.fetchSubCoursesList(data);
        }

        if (data.specialityname == 'Studying') {
          this.isStudying = true;
          this.signupForm.get('studying')?.setValue(1);
        } else {
          this.isStudying = false;
        }
        if (
          data.specialityname == 'Studying' ||
          data.specialityname == 'Completed'
        ) {
          this.signupForm.get('sub_course_list')?.setValidators([]);
          this.signupForm.get('sub_course_list')?.updateValueAndValidity();
        } else {
          this.signupForm
            .get('sub_course_list')
            ?.setValidators([Validators.required]);
          this.signupForm.get('sub_course_list')?.updateValueAndValidity();
          this.signupForm.get('studying')?.setValidators([Validators.required]);
          this.signupForm.get('studying')?.updateValueAndValidity();
        }
        if (
          data.specialityname == 'Completed' ||
          data.specialityname == 'MD' ||
          data.specialityname == 'MS' ||
          data.specialityname == 'DNB' ||
          data.specialityname == 'DM' ||
          data.specialityname == 'MCH' ||
          data.specialityname == 'DRNB'
        ) {
          this.isCompletedSelected = true;
        } else {
          this.isCompletedSelected = false;
        }
        if (data.specialityname == 'DNB' || data.specialityname == 'DRNB') {
          this.collegePlaceHolder = 'Select Institute';
        } else {
          this.collegePlaceHolder = 'Select College';
        }
      }
    });
    this.signupForm.get('isStudying')?.valueChanges.subscribe((data: any) => {
      if (data) {
        if (data == 'studying') {
          this.signupForm.get('studying')?.setValue(1);
          this.signupForm.get('studying')?.updateValueAndValidity();
          this.isStudying = true;
          this.isPracticeSelected = false;
          this.signupForm.get('state')?.reset();
          this.signupForm.get('college_id')?.reset();
        }
        if (data == 'completed') {
          this.signupForm.get('studying')?.setValue(0);
          this.signupForm.get('studying')?.updateValueAndValidity();
          this.isStudying = false;
          this.isPracticeSelected = true;
        }
      }
    });

    this.signupForm.get('state')?.valueChanges.subscribe((data: any) => {
      if (data?.name) {
        this.signupForm.get('state')?.setValue(data?.name);
        this.fetchCollegeList(data);
      }
      this.selectedState = data;
    });
  }
  openDatePicker() {
    this.dateInput.nativeElement.click();
    this.dateInput.nativeElement.focus();
  }

  checkLogin() {
    let isUserLoggedIn = localStorage.getItem('LoggedInUser');
    if (!isUserLoggedIn?.length) {
      this.router.navigate(['login']);
      this.toastr.error('Please Login again', '', { timeOut: 2000 });
    }
  }
  openStateModal() {
    this.isOpenStateModal = true;
  }
  openSubCourseModal() {
    this.isOpenSubCourseModal = true;
  }
  openModal() {
    this.isOpenStateModal = true;
  }
  openCollegeModal() {
    this.isOpenCollegeModal = true;
  }
  getSelectedState(data: any) {
    this.signupForm.get('state')?.setValue(data.name);
    this.selectedState = data;
    this.fetchCollegeList(data);
  }
  closeStateModal() {
    this.isOpenStateModal = false;
  }
  closeSubCourseModal() {
    this.isOpenSubCourseModal = false;
  }
  closeCollegeModal() {
    this.isOpenCollegeModal = false;
  }
  getSelectedSubCourse(data: any) {
    this.signupForm.get('sub_course_list')?.setValue(data.name);
    this.selectedSubCourseList = data;
  }
  getSelectedCollege(data: any) {
    this.signupForm.get('college_id')?.setValue(data.name);
    this.selectedCollege = data;
  }
  onSubmit() {
    if (this.signupForm.value) {
      let dataToPass = {
        user_uuid: this.signupForm.value?.user_uuid,
        fullname: this.signupForm.value?.fullname,
        alternativemobilenumber: this.signupForm.value?.alternativemobilenumber,
        email: this.signupForm.value?.email,
        gender: parseInt(this.signupForm.value?.gender),
        doornumber: '',
        area: '',
        pincode: '',
        img: '',
        course: this.signupForm.value?.course?.id,
        sub_course: this.signupForm.value?.sub_course?.id,
        sub_course_list: this.selectedSubCourseList?.id,
        yearofstudying: this.signupForm.value?.yearofstudying,
        studying: this.signupForm.value?.studying,
        practice: 2,
        state: this.selectedState?.id,
        college_id: this.selectedCollege?.id,
        city: this.signupForm.value?.city,
        dob: this.signupForm.value?.dob,
      };
      this.userServ.registerUser(dataToPass).subscribe({
        next: (data: any) => {
          this.toastr.success(data.responseContents, '', { timeOut: 1000 });
          this.router.navigate(['dashboard']);
        },
        error: (err: any) => {
          this.toastr.error('Failed to register', '', { timeOut: 1000 });
        },
      });
    } else {
      console.log('Form is invalid');
      this.toastr.error('Internal Server Error', 'Register Again', {
        timeOut: 1000,
      });
    }
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
      courses_id: data.id,
    };
    this.userServ.getSpeciality(dataToPass).subscribe({
      next: (data: any) => {
        this.specialities = data.responseContents;
      },
      error: (err: any) => {},
    });
  }

  onStateSelected(value: string) {
    // this.signupForm.get('state')?.setValue(value);
    // Handle the selected value as needed
    this.fetchCollegeList(value);
  }

  onSubCourseSelected(value: string) {}
  onCollegeSelected(value: string) {
    // this.signupForm.get('state')?.setValue(value);
    // Handle the selected value as needed
    // this.fetchCollegeList(value);
  }

  fetchSubCoursesList(data: any) {
    let dataToPass = {
      courses_id: data.id,
    };
    this.userServ.getSubCourseList(dataToPass).subscribe({
      next: (data: any) => {
        //this.specialities = data.responseContents;
        this.subCoursesList = data.responseContents;
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Internal Server Error', 'Login Again', {
          timeOut: 1000,
        });
      },
    });
  }

  fetchStateList() {
    this.userServ.getStateList().subscribe({
      next: (data: any) => {
        this.stateList = data.responseContents;
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Internal Server Error', 'Login Again', {
          timeOut: 1000,
        });
      },
    });
  }

  fetchCollegeList(data: any) {
    let dataToPass = {
      state_id: data.id,
      clgtype: 2,
    };
    this.userServ.getCollegeList(dataToPass).subscribe({
      next: (data: any) => {
        this.collegeList = data.responseContents;
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Internal Server Error', 'Login Again', {
          timeOut: 1000,
        });
      },
    });
  }
}
