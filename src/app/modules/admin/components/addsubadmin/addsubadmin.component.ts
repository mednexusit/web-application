import { Component, OnInit } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addsubadmin',
  templateUrl: './addsubadmin.component.html',
  styleUrl: './addsubadmin.component.scss',
})
export class AddsubadminComponent implements OnInit {
  subAdminFormGroup: FormGroup;
  isOpenAddSubAdmin: boolean;
  constructor(
    private adminServ: AdminservService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.subAdminFormGroup = this.fb.group({
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ]),
      ],
    });
  }
  registerSubAdmin(data: any) {
    let dataToPass = {
      mobile: `+91${data.mobile}`,
    };
    if (data.mobile) {
      this.adminServ.createSubAdmin(dataToPass).subscribe({
        next: (data: any) => {
          if (data.status) {
            this.toastr.success(data.msg, '', {
              timeOut: 1000,
            });
            this.subAdminFormGroup.reset();
            this.isOpenAddSubAdmin = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.isOpenAddSubAdmin = false;
          this.subAdminFormGroup.reset();
          this.toastr.error('Failed to add sub admin');
        },
      });
    }
  }
}
