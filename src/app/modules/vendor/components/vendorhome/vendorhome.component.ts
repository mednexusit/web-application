import { Component } from '@angular/core';

export interface RegistrationData {
  sno: number;
  name: string;
  date: string;
  location: string;
  registrations: number;
  status: string;
}

const ELEMENT_DATA: RegistrationData[] = [
  { sno: 1, name: 'International Conference on Dermatology Conference on Health and Medicine', date: '02 OCT 2024', location: 'Hyderabad', registrations: 500, status: 'view' },
  { sno: 2, name: '(ICRAMNH)', date: '02 OCT 2024', location: 'Bengaluru', registrations: 200, status: 'view' },
  { sno: 3, name: 'International Conference on Dermatology Dermatology Conference on Health and Medicine', date: '02 OCT 2024', location: 'Pune', registrations: 300, status: 'view' },
  { sno: 4, name: 'International Conference on (ICNH) Dermatology Conference on Health and Medicine', date: '02 OCT 2024', location: 'Mumbai', registrations: 400, status: 'view' },
  { sno: 5, name: 'International Conference on Gerontology for Conference on Health and Medicine', date: '02 OCT 2024', location: 'Kerala', registrations: 460, status: 'view' },
  { sno: 6, name: 'Conference on Health and Medicine Conference on Health and Medicine ', date: '02 OCT 2024', location: 'Tirupati', registrations: 800, status: 'view' },
];

@Component({
  selector: 'app-vendorhome',
  templateUrl: './vendorhome.component.html',
  styleUrl: './vendorhome.component.scss'
})
export class VendorhomeComponent {

  cards = [
    { title: 'Total Booked Conference', value: 7265, range: 11.02 },
    { title: 'Upcoming Conference', value: 7265, range: 11.02 },
    { title: 'Ongoing Conference', value: 7265, range: 11.02 },
    { title: 'Completed Conference', value: 7265, range: 11.02 },
    { title: 'Revenue Generated', value: 7265, range: 11.02 },
    { title: 'Registrations', value: 7265, range: 11.02 },
    { title: 'Total Booked Conference', value: 7265, range: 11.02 }
  ];

  notifications = [
    { image: '../../../../../assets/ashit.png', title: 'NPI & Process Engineering', name: 'Mr. Arun Kumar Kotla', time: 'Just now' },
    { image: '../../../../../assets/bheem.png', title: 'Quality (QA) Incharge', name: 'Mr. Shashikanth Patil', time: '5 hours ago' },
    { image: '../../../../../assets/card-logo.png', title: 'Testing Incharge', name: 'Mr. Sravan Kumar', time: '7 hours ago' }
  ];

  displayedColumns: string[] = ['sno', 'name', 'date', 'location', 'registrations', 'status'];
  dataSource = ELEMENT_DATA;
}
