import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor, schema, toHTML, Toolbar } from 'ngx-editor';
import { SharedService } from '../../../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { AdminservService } from '../../services/adminserv.service';

@Component({
  selector: 'app-addconference',
  templateUrl: './addconference.component.html',
  styleUrl: './addconference.component.scss',
})
export class AddconferenceComponent implements OnInit, OnDestroy {
  aboutConferenceFG: any = FormGroup;
  scheduleFG: any = FormGroup;
  speakerFG: any = FormGroup;
  locationFG: any = FormGroup;
  imageURL: any = '';
  vendorData: any;
  currentStep = 1;
  editor: any;
  html: any;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['undo', 'redo'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  fileName: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private sharedServ: SharedService,
    private toast: ToastrService,
    private adminServ:AdminservService
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((data: any) => {
      this.vendorData = data;
    });
    this.editor = new Editor({});
    this.aboutConferenceFG = this.fb.group({
      about_conference: ['', Validators.required],
    });
    this.scheduleFG = this.fb.group({
      about_schedule: ['', Validators.required],
    });
    this.speakerFG = this.fb.group({
      about_speakers: ['', Validators.required],
    });
    this.locationFG = this.fb.group({
      about_location: ['', Validators.required],
    });
    this.getInitialDataMapped();
  }
  changeCurrentStep(data: number) {
    this.currentStep = data;
  }

  getInitialDataMapped(){
    this.aboutConferenceFG.get('about_conference').setValue(this.vendorData?.about_conference);
    this.scheduleFG.get('about_schedule').setValue(this.vendorData?.about_schedule);
    this.speakerFG.get('about_speakers').setValue(this.vendorData?.about_speakers);
    this.locationFG.get('about_location').setValue(this.vendorData?.about_location);
  }


  nextStep() {
    this.imageURL = '';
    this.fileName = '';
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {

    let dataToPass={
      vendor_id: parseInt(this.vendorData.id),
      about_conference:this.aboutConferenceFG.get('about_conference').value,
      about_schedule:this.scheduleFG.get('about_schedule').value,
      about_speakers:this.speakerFG.get('about_speakers').value,
      about_location:this.locationFG.get('about_location').value
    }

    this.adminServ.submitConferenceDetails(dataToPass).subscribe({
      next:(data:any)=>{
        this.toast.success("Conference",data.responseContents,{
          timeOut:1000
        })

      },
      error:(err:any)=>{
        this.toast.error("Failed to save conference details","",{
          timeOut:1000
        })
      }
    })


  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  onFileSelection(file: any) {
    let fileData: File = file.target.files[0];
    this.fileName = fileData.name;
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData, fileData.name);
      this.sharedServ.uploadFileCommon(formData).subscribe({
        next: (data: any) => {
          console.log('IMAGE DSATA', data);
          if (data.img) {
            this.imageURL = data.img;
            this.toast.success(
              `File ${fileData.name} uploaded successfully`,
              '',
              {
                timeOut: 1000,
              }
            );
          }
        },
        error: (err: any) => {
          this.toast.error('Failed to upload File', '', {
            timeOut: 1000,
          });
        },
      });
    }
  }
  getCopyLink() {
    let copyItem = document.getElementById('#imgURL') as HTMLInputElement;
    let imageArea = document.querySelector('.imagearea') as HTMLDivElement;
    copyItem && copyItem.classList.add('blue');
    imageArea && imageArea.classList.add('blue');
    copyItem && copyItem.select();
    navigator.clipboard.writeText(this.imageURL);
    this.toast.success('Link Copied To Clipboard');
  }
}
