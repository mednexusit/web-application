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
import { CommunitiesComponent } from './components/communities/communities.component';
import { EducationComponent } from './components/education/education.component';
import { ContactusComponent } from './components/contactus/contactus.component';

const routes: Routes = [{path:'',component:HomeComponent,children:[
  {path:'aboutus',component:AboutUsComponent},
  {path:'conferences',component:ConferenceComponent},
  {path:'addevent',component:AddEventComponent},
  {path:'features',component:FeaturesComponent},
  {path:'support',component:SupportComponent},
  {path:'userlogin',component:UserLoginComponent},
  {path:'communities',component:CommunitiesComponent},
  {path:'education',component:EducationComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'',component:MainComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
