import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    MainComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModuleModule
  ]
})
export class UserModule { }
