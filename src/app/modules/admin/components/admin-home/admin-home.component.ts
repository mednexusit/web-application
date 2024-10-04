import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../../shared/shared.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent implements OnInit {
  isHideFlag: boolean = false;
  constructor(private sharedServ: SharedService) {}
  ngOnInit(): void {
    this.sharedServ.getHideFlag().subscribe((data: any) => {
      this.isHideFlag = data;
    });
  }
}
