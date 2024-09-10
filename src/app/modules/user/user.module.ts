import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SupportComponent } from './components/support/support.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FeaturesComponent } from './components/features/features.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SharedModuleModule } from '../../common/shared-module/shared-module.module';
import { MainComponent } from './components/main/main.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { EducationComponent } from './components/education/education.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FollowusComponent } from './components/followus/followus.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { Home1Component } from './components/home1/home1.component';
import { MyInterestComponent } from './components/my-interest/my-interest.component';
import { SearchComponent } from './components/search/search.component';
import { NexusComponent } from './components/nexus/nexus.component';
import { Education1Component } from './components/education1/education1.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

 


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    UserLoginComponent,
    SupportComponent,
    AddEventComponent,
    FeaturesComponent,
    ConferenceComponent,
    AboutUsComponent,
    MainComponent,
    CommunitiesComponent,
    EducationComponent,
    ContactusComponent,
    FollowusComponent,
    LoginComponent,
    SignupComponent,
    UserDashboardComponent,
    Home1Component,
    MyInterestComponent,
    SearchComponent,
    NexusComponent,
    Education1Component,
    SidebarComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule
  ]
})
export class UserModule { }
