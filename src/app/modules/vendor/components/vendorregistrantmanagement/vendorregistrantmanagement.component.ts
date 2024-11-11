import { Component } from '@angular/core';

interface Conference {
  sno: number;
  conferenceName: string;
  date: string;
  location: string;
  register: number;
  status: string;
}

const ELEMENT_DATA: Conference[] = [
  { sno: 1, conferenceName: 'Ann Chovey Chovey test testtesttest', date: '2022-01-11', location: 'Hyderabad', register: 300, status: 'Closed' },
  { sno: 2, conferenceName: 'Frank Furter testtesttest', date: '2022-01-11', location: 'Bengaluru', register: 400, status: 'Ongoing' },
  { sno: 3, conferenceName: 'Barb Akew testtesttesttest', date: '2022-01-11', location: 'Pune', register: 100, status: 'Upcoming' },
  { sno: 4, conferenceName: 'Emma Grate testtesttest', date: '2022-01-11', location: 'Hyderabad', register: 300, status: 'Closed' },
  { sno: 5, conferenceName: 'Don Messwidme testtesttest', date: '2022-01-12', location: 'Bengaluru', register: 400, status: 'Ongoing' },
  { sno: 6, conferenceName: 'Carmen Sayid testtesttest', date: '2022-01-12', location: 'Pune', register: 100, status: 'Upcoming' }
];

@Component({
  selector: 'app-vendorregistrantmanagement',
  templateUrl: './vendorregistrantmanagement.component.html',
  styleUrl: './vendorregistrantmanagement.component.scss'
})
export class VendorregistrantmanagementComponent {
  searchText: string = '';
  displayedColumns: string[] = ['sno', 'conferenceName', 'date', 'location', 'register', 'status', 'action'];
  dataSource = ELEMENT_DATA;

  viewDetails(element: Conference) {
    console.log('View details for', element);
  }

  editConference(element: Conference) {
    console.log('Edit conference', element);
  }

  deleteConference(element: Conference) {
    console.log('Delete conference', element);
  }

}
