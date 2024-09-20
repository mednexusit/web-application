import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-education1',
  templateUrl: './education1.component.html',
  styleUrl: './education1.component.scss'
})
export class Education1Component {
constructor(private router:Router){

}
goToNewsFeed(){
  this.router.navigate(['dashboard/news-feed']);
}
goBack(){
  this.router.navigate(['dashboard']);
}
}
