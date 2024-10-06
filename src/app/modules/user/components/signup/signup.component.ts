import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  selectedCourse: any;
  selectedSpecitality: any;
  isStudying: boolean = false;
  isCompletedSelected: boolean = false;
  isPracticeSelected: boolean = false;
  specialities: any = [];
  subCoursesList: any = [];
  courses: any = [];
  mbbsSpecialities: any = [
    { id: 1, name: 'Studying' },
    { id: 2, name: 'Completed' },
  ];
  pgdnbSpecialities: any = [];

  constructor(private fb: FormBuilder, private userServ: UserService) {
    this.signupForm = this.fb.group({
      user_uuid: ['', Validators.required],
      fullname: ['', Validators.required],
      alternativemobilenumber: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      doornumber: ['', Validators.required],
      area: ['', Validators.required],
      pincode: ['', Validators.required],
      img: ['', Validators.required],
      course: ['', Validators.required],
      sub_course: ['', Validators.required],
      sub_course_list: ['', Validators.required],
      yearofstudying: ['', Validators.required],
      isStudying: [''],
      studying: ['', Validators.required],
      practice: ['', Validators.required],
      state: ['', Validators.required],
      college_id: ['', Validators.required],
      city: ['', Validators.required],
      dob: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
    this.signupForm.get('course')?.valueChanges.subscribe((data: any) => {
      this.selectedCourse = data;
      this.isCompletedSelected = false;
      if (this.selectedCourse && this.selectedCourse.id) {
        this.fetchSpeciality(this.selectedCourse);
      } else {
        this.specialities = [];
      }
    });

    this.signupForm.get('sub_course')?.valueChanges.subscribe((data: any) => {
      if (data) {
        console.log('s', data);
        if (data.specialityname == 'Studying') {
          this.isStudying = true;
          this.signupForm.get('studying')?.setValue(1);
        } else {
          this.isStudying = false;
        }
        if (data.specialityname == 'Completed' || data.specialityname == 'MD') {
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
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  fetchCourses() {
    this.userServ.getCourses().subscribe({
      next: (data: any) => {
        console.log(data);
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
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  fetchSubCoursesList() {}
}
