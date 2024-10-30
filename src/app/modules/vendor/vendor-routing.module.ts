import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorloginComponent } from './components/vendorlogin/vendorlogin.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorforgotpasswordComponent } from './components/vendorforgotpassword/vendorforgotpassword.component';
import { VendorverifyotpComponent } from './components/vendorverifyotp/vendorverifyotp.component';
import { VendorconferenceComponent } from './components/vendorconference/vendorconference.component';
import { VendorcreateconferenceComponent } from './components/vendorcreateconference/vendorcreateconference.component';
import { MessagenotificationComponent } from './components/messagenotification/messagenotification.component';
import { VendorfinancialoverviewComponent } from './components/vendorfinancialoverview/vendorfinancialoverview.component';
import { VendorregistrantmanagementComponent } from './components/vendorregistrantmanagement/vendorregistrantmanagement.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SupportComponent } from '../user/components/support/support.component';
import { VendorhomeComponent } from './components/vendorhome/vendorhome.component';

const routes: Routes = [
  { path: 'vendorsignup', component: HomeComponent },
  { path: '', component: VendorloginComponent },
  { path: 'forgot-password', component: VendorforgotpasswordComponent },
  { path: 'verify-otp', component: VendorverifyotpComponent },
  { path: 'dashboard', component: DashboardComponent ,
    children:[
      {path:'',component:VendorhomeComponent},
      {path:'conference',component:VendorconferenceComponent},
      {path:'create-conference',component:VendorcreateconferenceComponent},
      {path:'notification',component:MessagenotificationComponent},
      {path:'financial-overview',component:VendorfinancialoverviewComponent},
      {path:'registrant',component:VendorregistrantmanagementComponent},
      {path:'analytics',component:AnalyticsComponent},
      {path:'support',component:SupportComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule {}
