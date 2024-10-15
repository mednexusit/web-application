import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) {}
  sendToken(token: string) {
    sessionStorage.setItem("LoggedInUser", token);
  }
  getToken() {
    return sessionStorage.getItem("LoggedInUser");
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    sessionStorage.removeItem("LoggedInUser");
    sessionStorage.clear();
    sessionStorage.clear();
    this.route.navigate(["login"]);
  }
  logoutUser(){
    sessionStorage.removeItem("LoggedInUser");
    sessionStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['']);
  }
}
