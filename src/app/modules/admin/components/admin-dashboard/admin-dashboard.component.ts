import { Component, OnInit } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  vendorRequestListData:any=[];
  searchTerm:any='';
  modalData:any;
  isShowVendorModal:boolean=false;
  constructor(private adminServ:AdminservService){

  }

  ngOnInit(): void {

      this.getAllVendorRequestList();


  }
  getAllVendorRequestList(){
    this.adminServ.getVendorRequestLists().subscribe({
      next:(data:any)=>{
        this.vendorRequestListData= data.responseContents;
        console.log(data);
      }
    })
  }
  openModal(data:any){
    this.isShowVendorModal=true;
    this.modalData=data;
    console.log(this.modalData)
  }
  closeModal(){
    this.isShowVendorModal=false;
    this.modalData=[];
  }
}
