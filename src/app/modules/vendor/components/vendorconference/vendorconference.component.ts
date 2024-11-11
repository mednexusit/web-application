import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

interface Conference {
  sno: number;
  conferenceName: string;
  date: string;
  location: string;
  register: number;
  status: string;
}
interface ConferenceList {
  sno: number;
  conferenceName: string;
  email: string;
  specialty: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: Conference[] = [
  { sno: 1, conferenceName: 'Ann Chovey', date: '2022-01-11', location: 'Hyderabad', register: 300, status: 'Closed' },
  { sno: 2, conferenceName: 'Frank Furter', date: '2022-01-11', location: 'Bengaluru', register: 400, status: 'Ongoing' },
  { sno: 3, conferenceName: 'Barb Akew', date: '2022-01-11', location: 'Pune', register: 100, status: 'Upcoming' },
  { sno: 4, conferenceName: 'Emma Grate', date: '2022-01-11', location: 'Hyderabad', register: 300, status: 'Closed' },
  { sno: 5, conferenceName: 'Don Messwidme', date: '2022-01-12', location: 'Bengaluru', register: 400, status: 'Ongoing' },
  { sno: 6, conferenceName: 'Carmen Sayid', date: '2022-01-12', location: 'Pune', register: 100, status: 'Upcoming' }
];

const ELEMENT_DATA1: ConferenceList[] = [
  { sno: 1, conferenceName: 'Ann Chovey', email: 'Annchovey@gmail.com', specialty: 'Hyderabad', date: '2022-01-11', status: 'Closed' },
  { sno: 2, conferenceName: 'Frank Furter', email: 'Frankfurter@gmail.com', specialty: 'Bengaluru', date: '2022-01-11', status: 'Ongoing' },
  { sno: 3, conferenceName: 'Barb Akew', email: 'Barbakew@gmail.com', specialty: 'Pune', date: '2022-01-11', status: 'Upcoming' },
  { sno: 4, conferenceName: 'Emma Grate', email: 'Emmagrate@gmail.com', specialty: 'Hyderabad', date: '2022-01-11', status: 'Closed' },
  { sno: 5, conferenceName: 'Don Messwidme', email: 'Donmesswidme@gmail.com', specialty: 'Bengaluru', date: '2022-01-11', status: 'Ongoing' },
  { sno: 6, conferenceName: 'Carmen Sayid', email: 'Carmensayid@gmail.com', specialty: 'Pune', date: '2022-01-11', status: 'Upcoming' }
];
@Component({
  selector: 'app-vendorconference',
  templateUrl: './vendorconference.component.html',
  styleUrl: './vendorconference.component.scss'
})
export class VendorconferenceComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayfirst = "none";
  displaySecond = "none";
  displayThird  = "none";

  title: string;
  note: string;
  date: string;
  time: string;
  venue: string;


  searchText: string = '';
  displayedColumns: string[] = ['sno', 'conferenceName', 'date', 'location', 'register', 'status', 'action'];
  displayedColumns1: string[] = ['sno', 'conferenceName', 'email', 'specialty', 'date', 'status', 'action'];
  dataSource = ELEMENT_DATA;
  dataSource1 = ELEMENT_DATA1;
  DefaultConferenceList = true;
  IsAddedList = false;
  showBtn = true;

  viewDetails(element: Conference) {
    console.log('View details for', element);
  }

  editConference(element: Conference) {
    console.log('Edit conference', element);
  }

  deleteConference(element: Conference) {
    console.log('Delete conference', element);
  }

  showTable(){
    this.IsAddedList = true;
    this.DefaultConferenceList = false;
    this.showBtn = false
  }

  openModal() {
    this.displayfirst = "block";
  }
  onCloseHandled() {
    this.displayfirst = "none";
  }

  sendModal(){
    this.displaySecond = "block";
  }

  sendCloseHandled(){
    this.displaySecond = "none";
    this.displayfirst = "none";
    this.displayThird = "none";
  }
  openAlert(){
    this.displayThird = "block";
  }
  closeAlert(){
    this.displaySecond = "none";
    this.displayfirst = "none";
    this.displayThird = "none";
  }
  alertclose(){
    this.displayThird = "none";
  }
  
  send() {}

  closeForm(){}
}
