import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss'
})
export class BookingsComponent implements OnInit {
  userData:any;
  bookings:any=[];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: any = ['Sr.No', 'Conference Name', 'Participants', 'Action'];
  constructor(private adminServ:AdminservService, private toastr:ToastrService){

  }
    ngOnInit(): void {
      this.userData = sessionStorage.getItem('userData');
      this.userData = JSON.parse(this.userData);
      this.getBookingList();
    }
    getBookingList(){
      this.adminServ.getBookingConfirmationList(this.userData).subscribe({
        next:(data:any)=>{
          if(data.responseContents){
            this.bookings = data.responseContents;
            this.dataSource.data = this.bookings;
            if (this.paginator) {
              this.dataSource.paginator = this.paginator; // Assign paginator after data
            }
          }
        },
        error:(err:any)=>{
          this.toastr.error('Failed to load','',{timeOut:1000});
        }
      })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    downloadCSV(conference: any) {
      const csvData = this.generateCSV(conference);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `${conference.conference_name}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    generateCSV(conference: any): string {
      const headers = ['Conference Name','Name', 'Email', 'Age', 'Gender','Date'];
      const rows = conference.participation.map((par: any) => [
        conference.conference_name,
        par.name,
        par.email,
        par.age,
        par.gender === 1 ? 'Male' : 'Female',
        this.formatDate(conference.conference_proposal_date_time)
      ]);
      return [headers.join(','), ...rows.map((row:any) => row.join(','))].join('\n');
    }
    formatDate(dateString: string): string {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      return `${year} ${day} ${month}`;
    }
}
