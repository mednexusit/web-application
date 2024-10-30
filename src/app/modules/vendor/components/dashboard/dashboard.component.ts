import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidebarOpen = true;
  sidenavMode: MatDrawerMode = 'side';
  isMobileMenuOpen = false;
  isHide: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isHide = !this.isHide;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
}
