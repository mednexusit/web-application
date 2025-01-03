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
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { Home1Component } from './components/home1/home1.component';
import { MyInterestComponent } from './components/my-interest/my-interest.component';
import { SearchComponent } from './components/search/search.component';
import { NexusComponent } from './components/nexus/nexus.component';
import { Education1Component } from './components/education1/education1.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsfeedlistComponent } from './components/newsfeedlist/newsfeedlist.component';
import { NewsfeeddetailComponent } from './components/newsfeeddetail/newsfeeddetail.component';
import { ConferenceslistComponent } from './components/conferenceslist/conferenceslist.component';
import { MyprofilepageComponent } from './components/myprofilepage/myprofilepage.component';
import { AreaofinterestComponent } from './components/areaofinterest/areaofinterest.component';
import { AreaofinterestsubsubjectComponent } from './components/areaofinterestsubsubject/areaofinterestsubsubject.component';
import { AreaofinterestlistComponent } from './components/areaofinterestlist/areaofinterestlist.component';
import { FollowusComponent } from './components/followus/followus.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'aboutus', component: AboutUsComponent },
      {path:'followus',component:FollowusComponent},
      { path: 'conferences', component: ConferenceComponent },
      { path: 'addevent', component: AddEventComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'support', component: SupportComponent },
      { path: 'userlogin', component: UserLoginComponent },
      { path: 'communities', component: CommunitiesComponent },
      { path: 'education', component: EducationComponent },
      { path: 'contactus', component: ContactusComponent },
      {
        path: 'dashboard',
        component: UserDashboardComponent,
        children: [
          { path: 'my-interest', component: MyInterestComponent },
          { path: 'home', component: DashboardComponent },
          { path: 'search', component: SearchComponent },
          { path: 'nexus', component: NexusComponent },
          { path: 'education1', component: Education1Component },
          { path: 'education1/news-feed', component: NewsfeedlistComponent },
          { path: 'education1/news-feed/news-feed-detail/:id', component: NewsfeeddetailComponent },
          { path: 'home/conferences-list/:id', component: ConferenceslistComponent },
          { path: 'myprofile', component: MyprofilepageComponent },
          {path:'areaofinterest',component:AreaofinterestComponent},
          {path:'aoisubjects/:id',component:AreaofinterestsubsubjectComponent},
          {path:'home/viewareaofinterest',component:AreaofinterestlistComponent},
          {path:'', redirectTo:'home',pathMatch:'full'}
        ],
      },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'home1', component: Home1Component },
      { path: 'search', component: SearchComponent },
      { path: '', component: MainComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
