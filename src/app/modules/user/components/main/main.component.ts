import { Component, HostListener, OnInit } from '@angular/core';
import { ThememanageService } from '../../theme/thememanage.service';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  icons = [
    // 'fa-solid fa-home',
    // 'fa-solid fa-star',
    // 'fa-solid fa-heart',
    // 'fa-solid fa-user',
    // 'fa-solid fa-search',
    // ' fa-solid fa-gear',
    // 'fa-solid fa-info',
    // 'fa-solid fa-circle-h',
    // 'fa-solid fa-lock',
    // 'fa-solid fa-circle-check',
    'mbbs-home-icon',
    'anatomy-home-icon',
    'physiology-home-icon',
    'biochemistry-home-icon',
    'pathology-home-icon',
    'pharmacology-home-icon',
    'microbiology-home-icon',
    'forensic-medicine-home-icon',
    'community-medicine-home-icon',
    'ophthalmology-home-icon',
    'ent-home-icon',
    'medicine-home-icon',
    'surgery-home-icon',
    'ob-gy-home-icon',
    'pediatrics-home-icon',
    'orthopedics-home-icon',
    'psychiatry-home-icon',
    'de-ve-home-icon',
    'anesthesia-home-icon',
    'radiology-home-icon',
    'emergency-medicine-home-icon',
    'special-category-home-icon'
  ];
  displayedIcons: any = [];
  startIndex = 0;
  iconsToShow = 10;
  screenWidth: any;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.iconsToShow = this.screenWidth <= 768 ? 4 : 10;
    this.updateDisplayedIcons();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateIconsToShow();
    this.updateDisplayedIcons();
  }

  updateIconsToShow() {
    this.screenWidth = window.innerWidth;
    this.iconsToShow = this.screenWidth <= 768 ? 4 : 10; // Adjust the screen width threshold as needed
  }

  constructor() {}
  categories: any = [
    { name: 'My Profile', value: 'profile', icon: 'fa-solid fa-user catIcon' },
    {
      name: 'Conferences',
      value: 'conferences',
      icon: 'fa-solid fa-users catIcon',
    },
    {
      name: 'Professional Credentials',
      value: 'credentials',
      icon: 'fa-solid fa-lock catIcon',
    },
    {
      name: 'CME Tracker',
      value: 'cmetracker',
      icon: 'fa-solid fa-map-pin catIcon',
    },
    {
      name: 'Certificates',
      value: 'certificates',
      icon: 'fa-solid fa-certificate catIcon',
    },
    {
      name: 'News Feeds',
      value: 'newsfeeds',
      icon: 'fa-solid fa-newspaper catIcon',
    },
  ];
  updateDisplayedIcons() {
    this.displayedIcons = [];
    for (let i = 0; i < this.iconsToShow; i++) {
      this.displayedIcons.push(
        this.icons[(this.startIndex + i) % this.icons.length]
      );
    }
  }

  prev() {
    this.startIndex =
      (this.startIndex - 1 + this.icons.length) % this.icons.length;
    this.updateDisplayedIcons();
  }

  next() {
    this.startIndex = (this.startIndex + 1) % this.icons.length;
    this.updateDisplayedIcons();
  }
}
