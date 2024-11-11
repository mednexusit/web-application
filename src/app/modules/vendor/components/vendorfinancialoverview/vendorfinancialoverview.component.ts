import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Conference {
  sno: number;
  conferenceName: string;
  totalEarnings: string;
  date: string;
  status: string;
}

const ELEMENT_DATA: Conference[] = [
  { sno: 1, conferenceName: 'Ann Chovey  test test test test', totalEarnings: 'Rs.200000', date: '2022-01-11',  status: 'Failed' },
  { sno: 2, conferenceName: 'Frank Furter', date: '2022-01-11', totalEarnings: 'Rs.200000',  status: 'Pending' },
  { sno: 3, conferenceName: 'Barb Akew test test test test', totalEarnings: 'Rs.200000', date: '2022-01-11', status: 'Closed' },
  { sno: 4, conferenceName: 'Emma Grate', totalEarnings: 'Rs.200000', date: '2022-01-11', status: 'Failed' },
  { sno: 5, conferenceName: 'Don Messwidme', totalEarnings: 'Rs.200000', date: '2022-01-12', status: 'Pending' },
  { sno: 6, conferenceName: 'Carmen Sayid', totalEarnings: 'Rs.200000', date: '2022-01-12', status: 'Closed' }
];

@Component({
  selector: 'app-vendorfinancialoverview',
  templateUrl: './vendorfinancialoverview.component.html',
  styleUrl: './vendorfinancialoverview.component.scss'
})
export class VendorfinancialoverviewComponent {

  DefaultScreen = true;
  InvoiceTable = false;
  searchText: string = '';
  displayedColumns: string[] = ['sno', 'conferenceName', 'totalEarnings', 'date', 'status', 'invoices'];
  dataSource = ELEMENT_DATA;

  cards = [
    { title: 'Total Earnings', amount: 4156.45, image: '../../../../../assets/fin-card-icon.svg' },
    { title: 'Pending Payments', amount: 3146.45, image: '../../../../../assets/fin-card-dollar-icon.svg' },
    { title: 'Payout Status', amount: 1146.45, image: '../../../../../assets/fin-card-money-icon.svg' },
    { title: 'Invoices', amount: 2146.45, image: '../../../../../assets/fin-card-dollar-icon.svg' },
  ];

  transactions = [
    { name: 'Rumi Aktar', date: new Date(2013, 10, 15), amount: 10000, image: '../../../../../assets/fin-table-img1.svg' },
    { name: 'Alamin Sarkar', date: new Date(2013, 9, 10), amount: 10000, image: '../../../../../assets/fin-table-img2.svg' },
    { name: 'Rasel Ahmed', date: new Date(2013, 8, 21), amount: 10000, image: '../../../../../assets/fin-table-img3.svg' },
    { name: 'Rumi Aktar', date: new Date(2013, 10, 15), amount: 10000, image: '../../../../../assets/fin-table-img1.svg' },
  ];

  cardInfo = {
    status: 'Active',
    card: 'Credit',
    cardType: 'Visa',
    cardNumber: '223456****',
    expireDate: '12-12-2026',
    currency: 'BDT',
    currencyIcon: '../../../../../assets/Flag 1.svg'
  };

  showTable(){
    this.DefaultScreen = false;
    this.InvoiceTable = true;
  }
  downloadFiles(){}
}
