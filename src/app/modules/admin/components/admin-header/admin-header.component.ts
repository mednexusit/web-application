import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {
  isHide: boolean = false;
  router = inject(Router);
  sharedServ = inject(SharedService);
  authServ = inject(AuthService);
  logout() {
    this.authServ.logout();
    this.router.navigate(['/admin']);
  }
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  hideSideNav() {
    this.isHide = !this.isHide;
    this.sharedServ.sendHideFlag(this.isHide);
  }
}
