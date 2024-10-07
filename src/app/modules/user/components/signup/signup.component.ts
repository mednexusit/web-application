import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
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
  courses: any = [];
  mbbsSpecialities: any = [
    { id: 1, name: 'Studying' },
    { id: 2, name: 'Completed' },
  ];
  pgdnbSpecialities: any = [];

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

  ngOnInit(): void {
    let userData = JSON.parse(localStorage.getItem('userData') as string);
    if (userData.userid) {
      this.signupForm.get('user_uuid')?.setValue(userData.userid);
    }
    this.fetchCourses();
    this.fetchStateList();
    this.signupForm.get('course')?.valueChanges.subscribe((data: any) => {
      this.subCoursesList = [];
      this.subCourseLabel = '';
      this.selectedCourse = data;
      this.isCompletedSelected = false;
      if (this.selectedCourse.name == 'Others') {
        this.isOtherSelected = true;
        this.signupForm.get('course')?.setValue(data.type);
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
      }
    });
    this.signupForm.get('isStudying')?.valueChanges.subscribe((data: any) => {
      if (data) {
        if (data == 'studying') {
          this.signupForm.get('studying')?.setValue(1);
          this.isStudying = true;
          this.isPracticeSelected = false;
        }
        if (data == 'completed') {
          this.signupForm.get('studying')?.setValue(0);
          this.isStudying = false;
          this.isPracticeSelected = true;
        }
      }
    });

    this.signupForm.get('state')?.valueChanges.subscribe((data: any) => {
      if (data.name) {
        this.signupForm.get('state')?.setValue(data.name);
        this.fetchCollegeList(data);
      }
      this.selectedState = data;
    });
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
        course: this.signupForm.value?.course.id,
        sub_course: this.signupForm.value?.sub_course.id,
        sub_course_list: this.signupForm.value?.sub_course_list,
        yearofstudying: this.signupForm.value?.yearofstudying,
        studying: this.signupForm.value?.studying,
        practice: 2,
        state: this.signupForm.value?.state,
        college_id: this.signupForm.value?.college_id,
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

  onSubCourseSelected(value: string) {
    console.log('value', value);
  }
  onCollegeSelected(value: string) {
    console.log('Selected College:', value);
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
      },
    });
  }
}
