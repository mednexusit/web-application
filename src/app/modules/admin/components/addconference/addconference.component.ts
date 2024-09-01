import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, schema, toHTML, Toolbar, toDoc } from 'ngx-editor';
import { SharedService } from '../../../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { AdminservService } from '../../services/adminserv.service';

@Component({
  selector: 'app-addconference',
  templateUrl: './addconference.component.html',
  styleUrl: './addconference.component.scss',
})
export class AddconferenceComponent implements OnInit {
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
    private router: Router,
    private fb: FormBuilder,
    private sharedServ: SharedService,
    private toast: ToastrService,
    private adminServ: AdminservService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.vendorData = navigation.extras.state;
    }
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe((data: any) => {
    //   this.vendorData = data;
    // });
    this.editor = new Editor({
      content: '',
    });
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

  getInitialDataMapped() {
    this.aboutConferenceFG
      .get('about_conference')
      .setValue(toDoc(this.vendorData?.about_conference));
    this.scheduleFG
      .get('about_schedule')
      .setValue(toDoc(this.vendorData?.about_schedule));
    this.speakerFG
      .get('about_speakers')
      .setValue(toDoc(this.vendorData?.about_speakers));
    this.locationFG
      .get('about_location')
      .setValue(toDoc(this.vendorData?.about_location));
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
    try {
      let conf = '';
      let sch = '';
      let spe = '';
      let loc = '';
      conf = toHTML(this.aboutConferenceFG.get('about_conference').value);
      sch = toHTML(this.scheduleFG.get('about_schedule').value);
      spe = toHTML(this.speakerFG.get('about_speakers').value);
      loc = toHTML(this.locationFG.get('about_location').value);
      let dataToPass = {
        vendor_id: parseInt(this.vendorData.id),
        about_conference: conf,
        about_schedule: sch,
        about_speakers: spe,
        about_location: loc,
      };

      this.adminServ.submitConferenceDetails(dataToPass).subscribe({
        next: (data: any) => {
          this.toast.success('Conference', data.responseContents, {
            timeOut: 1000,
          });

          this.aboutConferenceFG.reset();
          this.scheduleFG.reset();
          this.speakerFG.reset();
          this.locationFG.reset();
          this.router.navigate(['admin/adminhome']);
        },
        error: (err: any) => {
          this.toast.error('Failed to save conference details', err, {
            timeOut: 1000,
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  onFileSelection(file: any) {
    let fileData: File = file.target.files[0];
    this.fileName = fileData.name;
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData, fileData.name);
      this.sharedServ.uploadFileCommon(formData).subscribe({
        next: (data: any) => {
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
  goBack() {
    this.router.navigate(['admin/adminhome']);
  }
}
