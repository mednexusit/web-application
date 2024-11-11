import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Promotion {
  sno: number;
  promotionName: string;
  date: string;
  location: string;
  status: string;
}

const ELEMENT_DATA: Promotion[] = [
  { sno: 1, promotionName: 'Ann Chovey', date: '2022-01-11', location: 'Hyderabad', status: 'Active' },
  { sno: 2, promotionName: 'Frank Furter', date: '2022-01-11', location: 'Bengaluru',  status: 'Inactive' },
  { sno: 3, promotionName: 'Barb Akew', date: '2022-01-11', location: 'Pune', status: 'Active' },
  { sno: 4, promotionName: 'Emma Grate', date: '2022-01-11', location: 'Hyderabad', status: 'Inactive' },
  { sno: 5, promotionName: 'Don Messwidme', date: '2022-01-12', location: 'Bengaluru', status: 'Active' },
  { sno: 6, promotionName: 'Carmen Sayid', date: '2022-01-12', location: 'Pune', status: 'Inactive' }
];


@Component({
  selector: 'app-messagenotification',
  templateUrl: './messagenotification.component.html',
  styleUrl: './messagenotification.component.scss'
})
export class MessagenotificationComponent {
  searchText: string = '';
  displayedColumns: string[] = ['sno', 'promotionName', 'date', 'location', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  Defaulttable = true;
  ShowCreateProm = false;
  Promotionform: FormGroup;

  constructor(private formbuild: FormBuilder){
    this.Promotionform = this.formbuild.group({
      promotionName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      paymentStatus: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.Promotionform.valid) {
      console.log(this.Promotionform.value);
      // Process the form data here
    }
  }

  onCancel(): void {
    this.Promotionform.reset();
  }

  copyDetails(element: Promotion) {
    console.log('View details for', element);
  }

  viewDetails(element: Promotion) {
    console.log('View details for', element);
  }

  editConference(element: Promotion) {
    console.log('Edit conference', element);
  }

  deleteConference(element: Promotion) {
    console.log('Delete conference', element);
  }


  showCreatePromotion(){
    this.Defaulttable = false;
    this.ShowCreateProm = true;
  }
  showListScreen(){
    this.Defaulttable = true;
    this.ShowCreateProm = false;
  }
}
