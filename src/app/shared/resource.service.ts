import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { retry } from 'rxjs';

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
    return this.http.get(this.resourceAPI+'getstatelist', httpOptions);
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
}
