import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FeaturesComponent } from './components/features/features.component';
import { SupportComponent } from './components/support/support.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [{path:'',component:HomeComponent,children:[
  {path:'aboutus',component:AboutUsComponent},
  {path:'conferences',component:ConferenceComponent},
  {path:'addevent',component:AddEventComponent},
  {path:'features',component:FeaturesComponent},
  {path:'support',component:SupportComponent},
  {path:'userlogin',component:UserLoginComponent},
  {path:'',component:MainComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
