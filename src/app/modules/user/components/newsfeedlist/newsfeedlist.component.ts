import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsfeedlist',
  templateUrl: './newsfeedlist.component.html',
  styleUrl: './newsfeedlist.component.scss',
  providers: [DatePipe],
})
export class NewsfeedlistComponent implements OnInit {
  newsFeedData: any = [];
  constructor(
    private userServ: UserService,
    private toast: ToastrService,
    private datePipe: DatePipe,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getNewsFeedList();
  }
  getTimeAgo(created_at: string): string {
    const now = new Date();
    const createdDate = new Date(created_at);
    const timeDiff = Math.abs(now.getTime() - createdDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays === 0) {
      return 'today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else {
      return `${diffDays} days ago`;
    }
  }
  getNewsFeedList() {
    this.userServ.getRecentNewsFeed().subscribe({
      next: (data: any) => {
        if (data.responseContents) {
          this.newsFeedData = data.responseContents;
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toast.error('Failed to fetch news feed', '', { timeOut: 1000 });
      },
    });
  }
  goToNewsDetails(data: any) {
    this.router.navigate(['dashboard/education1/news-feed/news-feed-detail/', data.id], {
      state: { extraData: data },
    });
  }
  goBack() {
    this.router.navigate(['dashboard/education1'])
   // this.userServ.goBack();
  }
}
