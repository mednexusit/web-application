import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminservService {
  baseURL2 = environment.baseURL2;

  constructor(private http: HttpClient) {}
  getVendorRequestLists() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2+'reguser/getPersonalVendor',
      {},
      httpOptions
    );
  }

  approveRejectVendorRequest(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/approvePersonalVendor',
      data,
      httpOptions
    );
  }
  deleteVendorRequests(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2+'reguser/deletePersonalVendor',
      data,
      httpOptions
    );
  }

  createSubAdmin(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2+'reguser/createsubadmin',
      data,
      httpOptions
    );
  }

  getSubAdminList() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/getsubadmin',
      {},
      httpOptions
    );
  }

  toggleSubAdminStatus(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2+'reguser/subadminactive',
      data,
      httpOptions
    );
  }

  createNewsFeed(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/createnewsfeed',
      data,
      httpOptions
    );
  }

  getNewsFeed() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/Getallnewsfeed',
      {},
      httpOptions
    );
  }

  updateNewsFeed(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/updatesnewsfeed',
      data,
      httpOptions
    );
  }

  deleteNewsFeed(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/deletesnewsfeed',
      data,
      httpOptions
    );
  }

  getSubjects() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/getSubject',
      {},
      httpOptions
    );
  }

  getSubSubjects(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+'reguser/getsubSubject',data,httpOptions)
  }

  updateVendorDetails(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/updatePersonalVendor',
      data,
      httpOptions
    );
  }

  getBookingConfirmationList(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
   return this.http.post(this.baseURL2+'resorceapi/adminbookingconfirmationlist',data,httpOptions);
  }

  submitConferenceDetails(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+"reguser/addPersonalVendoraboutus",data,httpOptions)
  }

  getVendorProposalDetailsList(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+"reguser/getPersonalVendoraccepeted",data,httpOptions)
  }

  deleteVendorProposalDetails(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+"reguser/deletePersonalVendoraboutus",data,httpOptions)
  }

  getVendorProposalDetail(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+"reguser/getPersonalVendoraboutus",data,httpOptions)
  }

  acceptRejectVendorProposalDetail(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+"reguser/accepetandrejectPersonalVendoraboutus",data,httpOptions)
  }


  updateNewsBody(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.baseURL2+'resorceapi/detailsUpdatesNewsfeed',data,httpOptions)
  }
  getFeedbackList(data:any){
    //feedBack/getFeedBacks?limit=10&offset=0
    let authToken = sessionStorage.getItem('LoggedInUser');
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.get(this.baseURL2+`feedBack/getFeedBacks?limit=${data.limit}&offset=${data.offset}`,httpOptions)
  }
}
