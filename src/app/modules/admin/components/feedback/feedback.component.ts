import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  feedbacks:any=[];
  limit:any=100;
  offset:any=0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<any>([]);
  displayedColumns: any = ['Sr.No', 'Comment','Email' ,'Feedbacktime', 'Username','PhoneNumber','Action'];
  constructor(private adminServ:AdminservService){


  }
  ngOnInit(): void {
    this.getFeedbackList();
  }
  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator; // Assign paginator after data
      this.paginator.length = this.feedbacks.length;
    }
  }
  getFeedbackList(){
    let dtp={
      limit:this.limit,
      offset:this.offset
    }
    this.adminServ.getFeedbackList(dtp).subscribe({
      next:(data:any)=>{
        if(data.responseContents){
          this.feedbacks = data.responseContents;
          this.dataSource = new MatTableDataSource(this.feedbacks);
          console.log(this.feedbacks)
          if (this.paginator) {
            this.dataSource.paginator = this.paginator; // Assign paginator after data
            this.paginator.length = this.feedbacks.length;
          }
        }
      }
    })
  }
}
