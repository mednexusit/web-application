import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.scss'
})
export class ContactusComponent implements OnInit {

  contactUsForm:any=FormGroup;
  constructor(private fb:FormBuilder, private userServ:UserService, private toast:ToastrService){

  }
  ngOnInit(): void {
    this.contactUsForm = this.fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.required,Validators.email])],
      mobile:['',Validators.compose([Validators.minLength(10),Validators.maxLength(10)])],
      comments:['',Validators.required]
    })
  }

  submitContactForm(data:any){
    this.userServ.submitContactForm(data).subscribe({
      next:(data:any)=>{
        this.toast.success(data.responseContents,'',{timeOut:3000});
        this.contactUsForm.reset();
      },
      error:(error:any)=>{
        this.toast.error('Failed to send','',{timeOut:1000});
        console.error(error);
      }
    })
  }

}
