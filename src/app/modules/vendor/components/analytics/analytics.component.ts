import { Component } from '@angular/core';


interface Conference {
  sno: number;
  conferenceName: string;
  date: string;
  location: string;
}

const ELEMENT_DATA: Conference[] = [
  { sno: 1, conferenceName: 'Ann Chovey', date: '2022-01-11', location: 'Hyderabad' },
  { sno: 2, conferenceName: 'Frank Furter', date: '2022-01-11', location: 'Bengaluru' },
  { sno: 3, conferenceName: 'Barb Akew', date: '2022-01-11', location: 'Pune' },
  { sno: 4, conferenceName: 'Emma Grate', date: '2022-01-11', location: 'Hyderabad' },
  { sno: 5, conferenceName: 'Don Messwidme', date: '2022-01-12', location: 'Bengaluru' },
  { sno: 6, conferenceName: 'Carmen Sayid', date: '2022-01-12', location: 'Pune' }
];

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  displayedColumns: string[] = ['sno', 'conferenceName', 'date', 'location'];
  dataSource = ELEMENT_DATA;
}
