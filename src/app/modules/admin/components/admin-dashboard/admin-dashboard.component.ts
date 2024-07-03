import { Component, OnInit } from '@angular/core';
import { AdminservService } from '../../services/adminserv.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  vendorRequestListData:any=[];
  searchTerm:any='';
  modalData:any;
  activeVal:any;
  isShowVendorModal:boolean=false;
  constructor(private adminServ:AdminservService, private toastr:ToastrService){

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
  changeStatus(action:any,data:any){
    if(action==='approve'){
      this.activeVal=2
    }
    if(action==='reject'){
      this.activeVal=3
    }
    let dataToPass={
      id:data.id,
      active:this.activeVal
    }
    this.adminServ.approveRejectVendorRequest(dataToPass).subscribe({
      next:(data:any)=>{
        console.log(data);
        if(data.message){
          this.toastr.success(data.message,'',{timeOut:1000})
          this.isShowVendorModal=false;
          this.getAllVendorRequestList();
        }
      },
      error:(err:any)=>{
        this.toastr.error("Failed to update the status",'',{timeOut:1000});
        this.isShowVendorModal=false;
      }
    })

  }
  deleteRequest(data:any){
    Swal.fire({
      title:'Do you want to delete this request?',
      icon:'warning',
      showCancelButton:true,
      cancelButtonText:"No",
      showConfirmButton:true,
      confirmButtonText:"Yes",
    }).then((result)=>{
      if(result.isConfirmed){
        let dataToPass={
          id:data.id
        }
        this.adminServ.deleteVendorRequests(dataToPass).subscribe({
          next:(data:any)=>{
            if(data.message){
              this.toastr.success('Request Deleted Successfully','',{timeOut:1000});
              this.getAllVendorRequestList();
            }
          },
          error:(err:any)=>{
            this.toastr.error('Failed to delete','',{timeOut:1000})
          }
        })
      }

    })
  }
}
