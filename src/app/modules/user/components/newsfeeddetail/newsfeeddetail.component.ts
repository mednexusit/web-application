import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-newsfeeddetail',
  templateUrl: './newsfeeddetail.component.html',
  styleUrl: './newsfeeddetail.component.scss'
})
export class NewsfeeddetailComponent {
  constructor(private router:Router, private userServ:UserService){
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    console.log(state?.['extraData']);
  }

  goBack(){
    this.userServ.goBack();
  }
}
