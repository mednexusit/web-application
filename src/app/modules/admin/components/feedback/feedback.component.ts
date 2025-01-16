import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent implements OnInit, AfterViewInit {
  sanitizedHtmlDetails: SafeHtml;
  feedbacks:any=[];
  limit:any=100;
  offset:any=0;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<any>([]);
  displayedColumns: any = ['Sr.No', 'Comment','Email' ,'Feedbacktime', 'Username','PhoneNumber','heading','subheading','img','details'];
  constructor(private adminServ:AdminservService, private sanitizer: DomSanitizer,){


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
  sanitizeDetails(data:any){
  // Create a DOM parser to parse the HTML string
  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  // Add styles to the <p> tag
  const pTag = doc.querySelector('p');
  if (pTag) {
    pTag.style.height = 'auto';
    pTag.style.width = '120px';
  }

  // Add styles to the <img> tag
  const imgTag = doc.querySelector('img');
  if (imgTag) {
    imgTag.style.borderRadius = '10px';
    imgTag.style.width = '100%';
    imgTag.style.height = '100%';
  }

  // Serialize the updated HTML back to a string
  const updatedHtml = doc.body.innerHTML;

  // Sanitize and return the updated HTML
  return this.sanitizer.bypassSecurityTrustHtml(updatedHtml);
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
