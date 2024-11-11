import { Component } from '@angular/core';

@Component({
  selector: 'app-vendorfinancialoverview',
  templateUrl: './vendorfinancialoverview.component.html',
  styleUrl: './vendorfinancialoverview.component.scss'
})
export class VendorfinancialoverviewComponent {

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
}
