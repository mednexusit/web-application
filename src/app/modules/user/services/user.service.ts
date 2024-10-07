import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL = environment.baseURL;
  resourceApiURL = environment.resourceAPIURL;
  constructor(private http: HttpClient, private router: Router) {}

  submitContactForm(data: any) {
    return this.http.post(this.baseURL + 'contactus/submit', data);
  }
  getRecentNewsFeed() {
    let authToken = localStorage.getItem('LoggedInUser');
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

  goBack() {
    this.router.navigate(['dashboard']);
  }
  // http://3.109.153.67/api/usercourses/getcourslist

  getCourses() {
    let authToken = localStorage.getItem('LoggedInUser');
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
    let authToken = localStorage.getItem('LoggedInUser');
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
    let authToken = localStorage.getItem('LoggedInUser');
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
    let authToken = localStorage.getItem('LoggedInUser');
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
    let authToken = localStorage.getItem('LoggedInUser');
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
    let authToken = localStorage.getItem('LoggedInUser');
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
}
