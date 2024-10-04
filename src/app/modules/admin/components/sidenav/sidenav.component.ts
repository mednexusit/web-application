import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent implements OnInit {
  isHideFlag: boolean = false;
  userType: any;
  openSubAdmin: boolean = false;
  isNewsFeedOpen: boolean = false;
  constructor(private route: Router, private sharedServ: SharedService) {}
  ngOnInit(): void {
    this.sharedServ.getHideFlag().subscribe((data: any) => {
      this.isHideFlag = data;
    });
    this.userType = this.sharedServ.getUserType();
  }
  goToHome() {
    this.route.navigate(['admin/adminhome']);
  }
  openSubMenus() {
    this.openSubAdmin = !this.openSubAdmin;
  }
  goToVendorProposals() {
    this.route.navigate(['admin/adminhome/vendor-proposals']);
  }
  openNewsFeed() {
    this.isNewsFeedOpen = !this.isNewsFeedOpen;
  }
}
