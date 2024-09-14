import { SharedService } from './../../../../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { ThememanageService } from '../../theme/thememanage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;
  logoSrc: string;
  userLogoSrc:string;
  toggleLogoSrc:string;
  isLoggedInUser:boolean=false;


  constructor(private rt: ActivatedRoute,private themeService: ThememanageService, private SharedService:SharedService, private authServ:AuthService, private router:Router) {
    this.logoSrc = this.themeService.getLogo();
    this.userLogoSrc=this.themeService.getUserLogo();
    this.toggleLogoSrc=this.themeService.getToggleLogo();
  }
  ngOnInit(): void {
   this.isLoggedInUser =  localStorage.getItem('LoggedInUser') !== null;
   console.log(this.router.url)
   if(this.router.url=='/dashboard'){
    let whitelogo = document.querySelector('.logo') as HTMLImageElement;
     whitelogo.style.opacity = "0";
   }
  }
  logoutUser(){
    this.authServ.logoutUser();
    this.router.navigate(['']);
    this.isLoggedInUser =  localStorage.getItem('LoggedInUser') !== null;

  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme);
    this.SharedService.sendTheme(this.isDarkTheme);
    this.logoSrc = this.themeService.getLogo();
    this.toggleLogoSrc=this.themeService.getToggleLogo();
    this.userLogoSrc=this.themeService.getUserLogo();
  }


}
