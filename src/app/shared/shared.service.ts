import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  userLogin(data: any) {
    console.log("UserLogin",data);
    return this.http.post(this.baseURL + 'auth/checklogin', data);
  }

  verifyOtp(data:any){
    return this.http.post(this.baseURL+'auth/login',data);
  }

  routeFrom = new BehaviorSubject<any>('');
  sendRoute(data: any) {
    this.routeFrom.next(data);
  }

  getRoute() {
    return this.routeFrom.asObservable();
  }

  uploadFileCommon(data:any){
    return this.http.post(this.baseURL+'upload/category',data)
  }

  submitVendorProposalForm(data:any){
    return this.http.post('http://3.109.153.67/reguser/PersonalVendor',data)
  }

  getUserType(){
    let userData:any= localStorage.getItem("userData");
    let userType;
    if(userData){
      userData = JSON.parse(userData);
      userType= userData['usertype'];
    }
    return userType;
  }




}
