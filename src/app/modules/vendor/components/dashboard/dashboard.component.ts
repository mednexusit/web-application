import { Component, inject } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';

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
  titleName = "Geethanjali";
  titleDesg = "Admin";
  authServ = inject(AuthService);
  router = inject(Router);

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.isHide = !this.isHide;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authServ.logout();
    this.router.navigate(['/vendor']);
  }
  
}
