import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route: Router) {}
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token);
  }
  getToken() {
    return localStorage.getItem("LoggedInUser");
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(["login"]);
  }
  logoutUser(){
    localStorage.removeItem("LoggedInUser");
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['']);
  }
}
