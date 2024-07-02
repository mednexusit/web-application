import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  resourceAPI= environment.resourceAPIURL;

  constructor(private http:HttpClient) { }
  getStates(){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.get(this.resourceAPI+'getstatelist', httpOptions).pipe(
      map((data:any) => data.responseContents.map((item:any) => item))
    );
  }
  getColleges(data:any){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.post(this.resourceAPI+'getcollegebystate',data,httpOptions);
  }
  getMSList(){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.get(this.resourceAPI+'getmslist',httpOptions)
  }
  getMDList(){
    let authToken= localStorage.getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.get(this.resourceAPI+'getmdlist',httpOptions)
  }
  getMCHList(){
    let authToken=localStorage .getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.get(this.resourceAPI+'getmchlist',httpOptions)
  }
  getDNBList(){
    let authToken=localStorage .getItem("LoggedInUser")
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`,
      }),
    };
    return this.http.get(this.resourceAPI+'specialty',httpOptions)
  }





}
