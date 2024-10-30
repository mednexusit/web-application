import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';
import { SharedModuleModule } from '../../common/shared-module/shared-module.module';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorverifyotpComponent } from './components/vendorverifyotp/vendorverifyotp.component';
import { VendorforgotpasswordComponent } from './components/vendorforgotpassword/vendorforgotpassword.component';
import { VendorcreatenewpasswordComponent } from './components/vendorcreatenewpassword/vendorcreatenewpassword.component';
import { VendorconferenceComponent } from './components/vendorconference/vendorconference.component';
import { VendorheaderComponent } from './components/vendorheader/vendorheader.component';
import { VendorsidenavComponent } from './components/vendorsidenav/vendorsidenav.component';
import { VendorcreateconferenceComponent } from './components/vendorcreateconference/vendorcreateconference.component';
import { VendorfinancialoverviewComponent } from './components/vendorfinancialoverview/vendorfinancialoverview.component';
import { VendorregistrantmanagementComponent } from './components/vendorregistrantmanagement/vendorregistrantmanagement.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { MessagenotificationComponent } from './components/messagenotification/messagenotification.component';
import { SupportComponent } from './components/support/support.component';
import { VendorhomeComponent } from './components/vendorhome/vendorhome.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    VendorloginComponent,
    HomeComponent,
    DashboardComponent,
    VendorverifyotpComponent,
    VendorforgotpasswordComponent,
    VendorcreatenewpasswordComponent,
    VendorconferenceComponent,
    VendorheaderComponent,
    VendorsidenavComponent,
    VendorcreateconferenceComponent,
    VendorfinancialoverviewComponent,
    VendorregistrantmanagementComponent,
    AnalyticsComponent,
    MessagenotificationComponent,
    SupportComponent,
    VendorhomeComponent
  ],
  imports: [
    CommonModule,
    VendorRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule
    
    ]
})
export class VendorModule { }
