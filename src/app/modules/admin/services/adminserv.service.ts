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
}
