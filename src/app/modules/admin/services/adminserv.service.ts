import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminservService {

  constructor(private http:HttpClient) { }
  getVendorRequestLists(){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post('http://3.109.153.67/reguser/getPersonalVendor',{},httpOptions);
  }

  approveRejectVendorRequest(data:any){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post('http://3.109.153.67/reguser/approvePersonalVendor',data,httpOptions)
  }
  deleteVendorRequests(data:any){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post('http://3.109.153.67/reguser/deletePersonalVendor',data,httpOptions)
  }

  createSubAdmin(data:any){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post('http://3.109.153.67/reguser/createsubadmin',data,httpOptions)
  }

  getSubAdminList(){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post('http://3.109.153.67/reguser/getsubadmin',{},httpOptions)
  }

  toggleSubAdminStatus(data:any){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post('http://3.109.153.67/reguser/subadminactive',data,httpOptions)
  }

}
