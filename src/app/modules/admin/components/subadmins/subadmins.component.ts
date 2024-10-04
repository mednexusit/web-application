import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-subadmins',
  templateUrl: './subadmins.component.html',
  styleUrl: './subadmins.component.scss',
})
export class SubadminsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<any>([]);
  subAdminListData: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['Sr.No', 'UUID', 'Mobile', 'Status', 'Action'];

  constructor(private adminServ: AdminservService) {}

  ngOnInit(): void {
    this.getSubAdmin();
  }

  ngAfterViewInit(): void {
    // Ensure paginator is assigned after dataSource is initialized
    this.dataSource.paginator = this.paginator;
  }

  getSubAdmin() {
    this.adminServ.getSubAdminList().subscribe({
      next: (data: any) => {
        this.subAdminListData = data.responseContents.map((item: any) => ({
          ...item,
          isRotating: false,
        }));
        this.dataSource.data = this.subAdminListData; // Update dataSource with data
        if (this.paginator) {
          this.dataSource.paginator = this.paginator; // Assign paginator after data
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleStatus(data: any) {
    data.isRotating = !data.isRotating;
    const statusTemp = data.status === 0 ? 1 : 0;
    const dataToPass = {
      status: statusTemp,
      user_id: data.uuid,
    };
    this.adminServ.toggleSubAdminStatus(dataToPass).subscribe({
      next: () => {
        this.getSubAdmin();
      },
    });
  }
}
