import { Component } from '@angular/core';

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
}
