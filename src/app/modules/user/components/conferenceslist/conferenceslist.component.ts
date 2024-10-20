import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-conferenceslist',
  templateUrl: './conferenceslist.component.html',
  styleUrl: './conferenceslist.component.scss',
})
export class ConferenceslistComponent implements OnInit {
  userData: any;
  subjectID: any;
  categoryIDS: any = [];
  activeButton: string = 'ALL';
  conferenceListData: any = [];
  searchText:string='';
  onTabChange(data:MatTabChangeEvent){
    switch (data.tab.textLabel) {
      case 'ALL':
        this.fetchConferences([1, 2, 3, 4]);
        break;
      case 'ONLINE':
        this.fetchConferences([1]);
        break;
      case 'OFFLINE':
        this.fetchConferences([2]);
        break;
      case 'WORKSHOP':
        this.fetchConferences([3]);
        break;
      case 'EXPOS':
        this.fetchConferences([4]);
        break;
      default:
        break;
    }
  }

  // Method to set the active button
  currentIndex = 0;  // Index of the current slide

  // Go to the next slide
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.conferenceListData.length;
  }

  // Go to the previous slide
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.conferenceListData.length) % this.conferenceListData.length;
  }
  // Method to check if a button is active
  isActive(buttonLabel: string) {
    return this.activeButton === buttonLabel;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userServ: UserService
  ) {}
  ngOnInit(): void {
    this.subjectID = this.route.snapshot.paramMap.get('id');
    this.userData = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.categoryIDS = [1, 2, 3, 4];
    this.fetchConferences(this.categoryIDS);
  }
  fetchConferences(data: any) {
    let dataToPass = {
      subject_id: this.subjectID,
      category_id: data,
      user_id: this.userData.userid,
    };
    this.userServ.getUserConferenceLists(dataToPass).subscribe({
      next: (data: any) => {
        this.conferenceListData = data.responseContents;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  goBack() {
    this.userServ.goBack();
  }
}
