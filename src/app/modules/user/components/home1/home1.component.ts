import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrl: './home1.component.scss'
})
export class Home1Component {
  isSidebarOpen = true; // Sidebar initially open
  sidenavMode: MatDrawerMode = 'side'; // Correctly typing the sidenavMode as MatDrawerMode

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
