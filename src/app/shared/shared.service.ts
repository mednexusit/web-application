import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  baseURL = environment.baseURL;

  constructor(private http: HttpClient) {}

  userLogin(data: any) {
    return this.http.post(this.baseURL + 'auth/checklogin', data);
  }

  verifyOtp(data:any){
    return this.http.post(this.baseURL+'auth/login',data);
  }

}
