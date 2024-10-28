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
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Ensure this is imported

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { SupportComponent } from './components/support/support.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { FeaturesComponent } from './components/features/features.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MainComponent } from './components/main/main.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { EducationComponent } from './components/education/education.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { FollowusComponent } from './components/followus/followus.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { Home1Component } from './components/home1/home1.component';
import { MyInterestComponent } from './components/my-interest/my-interest.component';
import { SearchComponent } from './components/search/search.component';
import { NexusComponent } from './components/nexus/nexus.component';
import { Education1Component } from './components/education1/education1.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewsfeedlistComponent } from './components/newsfeedlist/newsfeedlist.component';
import { NewsfeeddetailComponent } from './components/newsfeeddetail/newsfeeddetail.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ModalautocompleteComponent } from './components/modalautocomplete/modalautocomplete.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConferenceslistComponent } from './components/conferenceslist/conferenceslist.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ConferencedetailsComponent } from './components/conferencedetails/conferencedetails.component';
import { MyprofilepageComponent } from './components/myprofilepage/myprofilepage.component';
import { AreaofinterestComponent } from './components/areaofinterest/areaofinterest.component';
import { AreaofinterestsubsubjectComponent } from './components/areaofinterestsubsubject/areaofinterestsubsubject.component';
import { AreaofinterestlistComponent } from './components/areaofinterestlist/areaofinterestlist.component';
import { NgOtpInputModule } from 'ng-otp-input';

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
    DashboardComponent,
    NewsfeedlistComponent,
    NewsfeeddetailComponent,
    AutocompleteComponent,
    ModalautocompleteComponent,
    ConferenceslistComponent,
    FilterPipe,
    ConferencedetailsComponent,
    MyprofilepageComponent,
    AreaofinterestComponent,
    AreaofinterestsubsubjectComponent,
    AreaofinterestlistComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatRadioModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule, // Make sure this is in the imports array
    MatFormFieldModule,
    MatInputModule,
    NgOtpInputModule,
  ],
})
export class UserModule {}
