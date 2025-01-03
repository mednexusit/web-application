import { map } from 'rxjs/operators';
import { filter, timeout } from 'rxjs';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../../shared/shared.service';
import { Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  vendorRequestListData: any = [];
  vendorRequestListDataArr: any = [];
  dataSource = new MatTableDataSource<any>([]);
  dataSource1 = new MatTableDataSource<any>([]);

  displayedColumns: any = ['Sr.No', 'Proposal ID', 'Status', 'Name', 'Action'];
  toggleText: any = 'Show Deleted Requests';
  isShowDeleted: boolean = false;
  isOpenAddSubAdmin: boolean = false;
  deletedVendorRequestListData: any = [];
  searchTerm: any = '';
  isShowSubAdmin: boolean = false;
  subAdminListData: any = [];
  searchTermDel: any = '';
  modalData: any;
  searchSubAdmin: any = '';
  userType: any;
  activeVal: any;
  editData: any;
  subjectsListData: any = [];
  subSubjectsListData: any = [];
  subSubjectListDataArray: any = [];
  subSubjectsListDataIMP: any = [];
  subSubjectListDataArrayIMP: any = [];
  action: any = '';
  isShowVendorModal: boolean = false;
  subAdminPhoneNumber: any = '';
  changeStart: boolean = false;
  subAdminFormGroup: any = FormGroup;
  editvendorFormGroup: any = FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator1!: MatPaginator;
  createdData: Date = new Date();
  formattedDate: string;
  categories: any = [
    { name: 'Conference(Online)', id: '1' },
    { name: 'Conference(Offline)', id: '2' },
    { name: 'Workshop', id: '3' },
    { name: 'Expos', id: '4' },
  ];
  constructor(
    private router: Router,
    private adminServ: AdminservService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private sharedServ: SharedService
  ) {}

  ngOnInit(): void {
    this.getAllVendorRequestList();
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
    this.userType = this.sharedServ.getUserType();
    this.editvendorFormGroup = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      email: Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone: Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      address: ['', Validators.required],
      organizedby: ['', Validators.required],
      eventname: ['', Validators.required],
      category: ['', Validators.required],
      state: ['', Validators.required],
      place: ['', Validators.required],
      pin: ['', Validators.required],
      venu: ['', Validators.required],
      speakerinfo: ['', Validators.required],
      session_name: ['', Validators.required],
      topic: ['', Validators.required],
      speaker_name: ['', Validators.required],
      duration: ['', Validators.required],
      letter: ['', Validators.required],
      cme_point: ['', Validators.required],
      vendorname: ['', Validators.required],
      contactemail: Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      contactperson: ['', Validators.required],
      contactphonenumber: '9876543210',
      bankname: ['', Validators.required],
      branchname: ['', Validators.required],
      accountholdername: ['', Validators.required],
      accountnumber: ['', Validators.required],
      ifsccode: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$'),
        ]),
      ],
      panno: ['', Validators.required],
      branchaddress: ['', Validators.required],
      subjects: this.fb.array([this.getSubjects()]),
      proposal_from_datetime:['',Validators.required],
      proposal_to_datetime:['',Validators.required],
      price:['',Validators.required]
    });

    // this.editvendorFormGroup
    //   .get('subjects')
    //   .valueChanges.subscribe((data: any) => {
    //     if (data) {
    //       this.getSubSubjectList(data);
    //     }
    //   });
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Assign paginator after data
    }
  }
  getSelectedSubject(e: any, i: any) {
    this.getSubSubjectList(e.target.value, i);
    // const item = this.subjectsListData.find(
    //   (item: any) => item.id == e.target.value
    // );
    // if (item) {
    //   item.isSelected = true;
    // }
  }

  // get items(): FormArray {
  //   return this.myForm.get('items') as FormArray;
  // }

  get subjectsListArray() {
    return this.editvendorFormGroup.get('subjects');
  }
  getSubjects() {
    return this.fb.group({
      subject: ['', Validators.required],
      sub_subject: ['', Validators.required],
    });
  }
  isImage(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(url);
  }

  // Check if the URL points to a PDF
  isPdf(url: string): boolean {
    return /\.pdf$/i.test(url);
  }
  addSubjects() {
    if (this.subjectsListArray?.length <= 8) {
      this.subjectsListArray.push(this.getSubjects());
      let selectedSubjectItems = this.editvendorFormGroup.get('subjects').value;
      selectedSubjectItems = selectedSubjectItems.map(
        (item: any) => item.subject
      );
      this.subjectsListData.forEach((subject: any) => {
        if (selectedSubjectItems.includes(subject.id.toString())) {
          subject.isSelected = true;
        }
      });
    } else {
      return;
    }
  }
  removeSubject(index: any, data: any) {
    const subjectId = this.subjectsListArray.at(index).get('subject').value;
    const subject = this.subjectsListData.find(
      (item: any) => item.id == subjectId
    );
    if (subject) {
      subject.isSelected = false;
    }
    this.subjectsListArray.removeAt(index);
    this.subSubjectListDataArray.splice(index, 1);
  }
  getAllVendorRequestList() {
    this.adminServ.getVendorRequestLists().subscribe({
      next: (data: any) => {
        this.vendorRequestListDataArr = data.responseContents;

        this.vendorRequestListData = this.vendorRequestListDataArr.filter(
          (item: any) => item.status === 1
        );
        this.dataSource.data = this.vendorRequestListData;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator; // Assign paginator after data
        }

        // this.dataSource.data = this.deletedVendorRequestListData;
      },
    });
  }

  getDeletedVendorRequestList() {
    this.adminServ.getVendorRequestLists().subscribe({
      next: (data: any) => {
        this.vendorRequestListDataArr = data.responseContents;
        this.deletedVendorRequestListData =
          this.vendorRequestListDataArr.filter(
            (item: any) => item.status === 0
          );
        this.dataSource1.data = this.deletedVendorRequestListData;
        if (this.paginator) {
          this.dataSource1.paginator = this.paginator; // Assign paginator after data
        }

        // this.dataSource.data = this.deletedVendorRequestListData;
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openModal(data: any, action: any) {
    this.action = action;
    if (action === 'view') {
      this.isShowVendorModal = true;
      this.modalData = data;

      let subjectDetailsData = [];
      // this.modalData.subject_details.forEach((item:any) => {

      // });
      for (let i = 0; i < this.modalData.subject_details?.length; i++) {
        subjectDetailsData.push({
          subject: this.modalData.subject_details[i],
          sub_subject: this.modalData.sub_subject_details[i],
        });
      }

      this.modalData.subjectDetailsData = subjectDetailsData;
    }

    if (action === 'edit') {
      this.getSubjectList(); // Populate subjectsListData dynamically
      this.isShowVendorModal = true;
      this.editData = data;

      // Clear existing FormArray
      const subjectsArray = this.editvendorFormGroup.get('subjects') as FormArray;
      subjectsArray.clear();

      // Populate FormArray dynamically
      const subjectDetails = this.editData.subject_details || [];
      const subSubjectDetails = this.editData.sub_subject_details || [];
      subjectDetails.forEach(async(subjectDetail: any, index: any) => {
      let dataGot =  await this.getSubSubjectListReturned(subjectDetail.subject_id);
        this.subSubjectListDataArray[index] = dataGot;
      let subSubject =   dataGot.find((item:any)=> item.id===subSubjectDetails[index].sub_subject_id);
       // const subSubject =  this.subSubjectsListData.find((s:any)=> s.)
      //  this.getSubSubjectList()
        // const subSubject =
        //   subSubjectDetails.find((s: any) => s.sub_subject_id === subjectDetail.subject_id) || {};

        subjectsArray.push(
          this.fb.group({
            subject: [subjectDetail.subject_id || '', Validators.required],
            sub_subject: [subSubject.id || '', Validators.required],
          })
        );

        //this.getSubSubjectList(subjectDetail.subject_id, index); // Fetch sub-subjects dynamically
      });

      // Set form values for other fields
      const setValueIfExists = (field: string, value: any) => {
        if (value !== null && value !== undefined) {
          this.editvendorFormGroup.get(field)?.setValue(value);
        }
      };

      setValueIfExists('id', this.editData.id);
      setValueIfExists('name', this.editData.name);
      setValueIfExists('age', this.editData.age);
      setValueIfExists('gender', this.editData.gender);
      setValueIfExists('email', this.editData.email);
      setValueIfExists('phone', this.editData.phone);
      setValueIfExists('address', this.editData.address);
      setValueIfExists('eventname', this.editData.eventname);
      setValueIfExists('category', this.editData.category);
      setValueIfExists('organizedby', this.editData.organizedby);
      setValueIfExists('state', this.editData.state);
      setValueIfExists('place', this.editData.place);
      setValueIfExists('pin', this.editData.pin);
      setValueIfExists('venu', this.editData.venu);
      setValueIfExists('speakerinfo', this.editData.speakerinfo);
      setValueIfExists('session_name', this.editData.session_name);
      setValueIfExists('topic', this.editData.topic);
      setValueIfExists('speaker_name', this.editData.speaker_name);
      setValueIfExists('duration', this.editData.duration);
      setValueIfExists('letter', this.editData.letter);
      setValueIfExists('cme_point', this.editData.cme_point);
      setValueIfExists('price', this.editData.price);
      setValueIfExists('vendorname', this.editData.vendorname);
      setValueIfExists('contactemail', this.editData.contactemail);
      setValueIfExists('contactperson', this.editData.contactperson);
      setValueIfExists('contactphonenumber', this.editData.contactphonenumber);
      setValueIfExists('bankname', this.editData.bankname);
      setValueIfExists('branchname', this.editData.branchname);
      setValueIfExists('accountholdername', this.editData.accountholdername);
      setValueIfExists('accountnumber', this.editData.accountnumber);
      setValueIfExists('ifsccode', this.editData.ifsccode);
      setValueIfExists('panno', this.editData.panno);
      setValueIfExists('branchaddress', this.editData.branchaddress);
      setValueIfExists('proposal_from_datetime', new Date(this.editData.proposal_from_datetime))
      setValueIfExists('proposal_to_datetime', new Date(this.editData.proposal_to_datetime))

      // Handle proposal_from_datetime
      // if (this.editData.proposal_from_datetime) {
      //   const utcDate = new Date(this.editData.proposal_from_datetime);
      //   const formattedDate = utcDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm
      //   this.editvendorFormGroup.get('proposal_from_datetime')?.setValue(formattedDate);
      // }
      // // Handle proposal_to_datetime
      // if (this.editData.proposal_to_datetime) {
      //   const utcDate = new Date(this.editData.proposal_to_datetime);
      //   const formattedDate = utcDate.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:mm
      //   this.editvendorFormGroup.get('proposal_to_datetime')?.setValue(formattedDate);
      // }
    }

  }
  toggleTables() {
    this.isShowDeleted = !this.isShowDeleted;
    this.toggleText = !this.isShowDeleted
      ? 'Show Deleted Requests'
      : 'Show Active Requests';

    if (this.isShowDeleted) {
      this.getDeletedVendorRequestList();
    } else {
      this.getAllVendorRequestList();
    }

    // Reassign paginator after the data changes
    this.dataSource.paginator = this.paginator;
  }
  private createSubjectFormGroup(subjectId: string, subSubjectId: string): FormGroup {
    return this.fb.group({
      subject: [subjectId, Validators.required],
      sub_subject: [subSubjectId, Validators.required],
    });
  }

  closeModal() {
    this.isShowVendorModal = false;
    this.modalData = {};
    this.editData = {};
    this.subjectsListData = [];
    this.editvendorFormGroup.reset();
  }
  changeStatus(action: any, data: any) {
    if (action === 'approve') {
      this.activeVal = 2;
    }
    if (action === 'reject') {
      this.activeVal = 3;
    }
    let dataToPass = {
      id: data.id,
      active: this.activeVal,
    };
    this.adminServ.approveRejectVendorRequest(dataToPass).subscribe({
      next: (data: any) => {
        if (data.message) {
          this.toastr.success(data.message, '', { timeOut: 1000 });
          this.isShowVendorModal = false;
          this.getAllVendorRequestList();
        }
      },
      error: (err: any) => {
        this.toastr.error('Failed to update the status', '', { timeOut: 1000 });
        this.isShowVendorModal = false;
      },
    });
  }
  deleteRequest(data: any) {
    Swal.fire({
      title: 'Do you want to delete this request?',
      icon: 'warning',
      showCancelButton: true,
      input: 'text',
      inputLabel: 'Enter Delete Comments',
      inputValidator: (result) => !result && 'Enter Delete Comment!',
      cancelButtonText: 'No',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed && result.value !== null) {
        let dataToPass = {
          id: data.id,
          comments: result.value,
        };
        this.adminServ.deleteVendorRequests(dataToPass).subscribe({
          next: (data: any) => {
            if (data.message) {
              this.toastr.success('Request Deleted Successfully', '', {
                timeOut: 1000,
              });
              this.getAllVendorRequestList();
            }
          },
          error: (err: any) => {
            this.toastr.error('Failed to delete', '', { timeOut: 1000 });
          },
        });
      } else {
      }
    });
  }
  openAddSubAdmin() {
    this.isOpenAddSubAdmin = true;
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
            this.getSubAdmin();
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
  goToNewsFeed() {
    this.router.navigate(['admin/adminhome/news-feed']);
  }
  closeAddModal() {
    this.isOpenAddSubAdmin = false;
  }
  showSubAdmin() {
    this.isShowSubAdmin = !this.isShowSubAdmin;
    if (this.isShowSubAdmin) {
      this.getSubAdmin();
    }
  }
  getSubAdmin() {
    this.adminServ.getSubAdminList().subscribe({
      next: (data: any) => {
        this.subAdminListData = data.responseContents;
        this.subAdminListData = this.subAdminListData.map((item: any) => ({
          ...item,
          isRotating: false,
        }));
      },
    });
  }
  toggleStatus(data: any) {
    data.isRotating = !data.isRotating;
    let statusTemp;
    if (data.status === 0) {
      statusTemp = 1;
    }
    if (data.status === 1) {
      statusTemp = 0;
    }
    let dataToPass = {
      status: statusTemp,
      user_id: data.uuid,
    };
    this.adminServ.toggleSubAdminStatus(dataToPass).subscribe({
      next: (data: any) => {
        this.getSubAdmin();
      },
    });
  }
  handleSessionNameFile(file: any) {
    let fileData: File = file.target.files[0];
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData, fileData.name);
      this.sharedServ.uploadFileCommon(formData).subscribe({
        next: (data: any) => {
          if (data.img) {
            this.toastr.success(
              `File ${fileData.name} uploaded successfully`,
              '',
              {
                timeOut: 1000,
              }
            );
            this.editvendorFormGroup.get('session_name').setValue(data.img);
            this.editvendorFormGroup
              .get('session_name')
              .updateValueAndValidity();
            this.editData.session_name = data.img;
          }
        },
        error: (err: any) => {
          this.toastr.error('Failed to upload File', '', {
            timeOut: 1000,
          });
        },
      });
    }
  }
  handleLetterField(file: any) {
    let fileData: File = file.target.files[0];
    if (fileData) {
      const formData = new FormData();
      formData.append('file', fileData, fileData.name);
      this.sharedServ.uploadFileCommon(formData).subscribe({
        next: (data: any) => {
          if (data.img) {
            this.toastr.success(
              `File ${fileData.name} uploaded successfully`,
              '',
              {
                timeOut: 1000,
              }
            );
            this.editvendorFormGroup.get('letter').setValue(data.img);
            this.editvendorFormGroup.get('letter').updateValueAndValidity();
            this.editData.letter = data.img;
          }
        },
        error: (err: any) => {
          this.toastr.error('Failed to upload File', '', {
            timeOut: 1000,
          });
        },
      });
    }
  }
  getSubjectList() {
    this.adminServ.getSubjects().subscribe({
      next: (data: any) => {
        this.subjectsListData = data.responseContents;
        this.subjectsListData.forEach((item: any) => {
          item.isSelected = false;
        });
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  getSubSubjectList(id: any, index: any) {
    let dataToPass = {
      subject_id: id,
    };
    this.adminServ.getSubSubjects(dataToPass).subscribe({
      next: (data: any) => {
        this.subSubjectsListData = data.responseContents;
        this.subSubjectListDataArray[index] = this.subSubjectsListData;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  async getSubSubjectListReturned(id: any) {
    let dataToPass = {
      subject_id: id,
    };

    try {
      const data: any = await this.adminServ.getSubSubjects(dataToPass).toPromise();
      this.subSubjectsListDataIMP = data.responseContents;
      return this.subSubjectsListDataIMP;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  updateVendorData(data: any) {
    if (data.gender === 'Male') {
      data.gender = '1';
    }
    if (data.gender === 'Female') {
      data.gender = '2';
    }

    data.subject = data.subjects.map((item: any) => parseInt(item.subject));
    data.sub_subject = data.subjects.map((item: any) =>
      parseInt(item.sub_subject)
    );
    this.adminServ.updateVendorDetails(data).subscribe({
      next: (data: any) => {
        this.toastr.success('Vendor details updated', '', { timeOut: 1000 });
        this.isShowVendorModal = false;
        this.getAllVendorRequestList();
        this.editvendorFormGroup.reset();
      },
      error: (err) => {
        this.toastr.error('Failed to update vendor', '', { timeOut: 1000 });
      },
    });
  }
  openAddConference(data: any) {
    const navigationExtras: NavigationExtras = {
      state: data,
    };
    this.router.navigate(['admin/adminhome/add-conference'], navigationExtras);
  }

  goToVendorsProposal() {
    this.router.navigate(['admin/adminhome/vendor-proposals']);
  }
}
