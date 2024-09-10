import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseURL=environment.baseURL;
  constructor(private http:HttpClient) { }

  submitContactForm(data:any){
   return this.http.post(this.baseURL+'contactus/submit',data)
  }
}
