import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = environment.baseURL;
  baseURL2= environment.baseURL2;
  resourceApiURL = environment.resourceAPIURL;
  constructor(private http: HttpClient, private router: Router) {}

  submitContactForm(data: any) {
    return this.http.post(this.baseURL + 'contactus/submit', data);
  }
  getRecentNewsFeed() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.resourceApiURL + 'Getallnewsfeed',
      {},
      httpOptions
    );
  }

  getNewsFeedDetails(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(
      `
      ${this.resourceApiURL}GetallheadingNewsfeedbyid/${data}`,
      httpOptions
    );
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }
  // http://3.109.153.67/api/usercourses/getcourslist

  getCourses() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL + 'usercourses/getcourslist',
      {},
      httpOptions
    );
  }

  getSpeciality(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL + 'usercourses/getsubcourslist',
      data,
      httpOptions
    );
  }

  getSubCourseList(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL + 'usercourses/getsubcourssublist',
      data,
      httpOptions
    );
  }
  getStateList() {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.get(this.resourceApiURL + 'getstatelist', httpOptions);
  }
  getCollegeList(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL + 'usercourses/getcollegeblistbystateidtypeid',
      data,
      httpOptions
    );
  }

  registerUser(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL + 'usercourses/userregistartion',
      data,
      httpOptions
    );
  }

  likeNewsFeed(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(this.resourceApiURL + 'feedlike', data, httpOptions);
  }
  dislikeNewsFeed(data: any) {
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.resourceApiURL + 'feeddislike',
      data,
      httpOptions
    );
  }
  getUserDetails(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL + 'usercourses/getuserlist',
      data,
      httpOptions
    );
  }

  getSpecialitiesAvailable(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.resourceApiURL + 'getallmbbs_specialty',
      data,
      httpOptions
    );
  }

  getUserConferenceLists(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/getPersonalVendor1',
      data,
      httpOptions
    );
  }

  updateUserProfileData(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'api/usercourses/userdataupdatebyid',
      data,
      httpOptions
    );
  }

  getAreaOfInterestSubjects(){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/getSubject',
      {},
      httpOptions
    );
  }
  getAreaOfInterestSubSubjects(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'reguser/getsubSubject',
      data,
      httpOptions
    );
  }

  createAreaOfInterest(data:any){
    //resorceapi/create_areaintrest
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/create_areaintrest',
      data,
      httpOptions
    );
  }
  //
  getAreaOfInterest(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/getallmbbs_specialty_subject_areaintrest',
      data,
      httpOptions
    );
  }

  deleteAreaOfInterest(data:any){
    //http://3.109.153.67/resorceapi/delete_areaintrest_contentbyid
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/delete_areaintrest_contentbyid',
      data,
      httpOptions
    );
  }

  getAllSearchConferences(data={}){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/getallconference',
      data,
      httpOptions
    );
  }

  getAllRemainders(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/getallconferenceremainders',
      data,
      httpOptions
    );
  }

  fetchBookMarkList(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/bookmarklist',
      data,
      httpOptions
    );
  }
  bookMarkSave(data:any){
    //resorceapi/bookmarksave
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/bookmarksave',
      data,
      httpOptions
    );
  }
  deleteBookMark(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/bookmarkdelet',
      data,
      httpOptions
    );
  }
  addParticipant(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'api/usercourses/regparticipation',
      data,
      httpOptions
    );
  }
  fetchParticipant(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'api/usercourses/getuserparticipationbyidlist',
      data,
      httpOptions
    );
  }
  editParticipant(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'api/usercourses/updateparticipationbyid',
      data,
      httpOptions
    );
  }
  deleteParticipant(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'api/usercourses/deleteparticipationbyid',
      data,
      httpOptions
    );
  }
  bookingConfirmation(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/bookingconfirmation',
      data,
      httpOptions
    );
  }
  fetchBookingConfirmation(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'resorceapi/bookingconfirmationlist',
      data,
      httpOptions
    );
  }
  submitFeedBack(data:any){
    let authToken = sessionStorage.getItem('LoggedInUser');
    let token;
    if (authToken) {
      token = JSON.parse(authToken);
    }
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
    return this.http.post(
      this.baseURL2 + 'feedBack/upsertFeedBack',
      data,
      httpOptions
    );
  }
}
